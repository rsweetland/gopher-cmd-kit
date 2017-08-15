// global onAuthSuccess()
 
var GopherUtility = function() {
	var oauthCallbackPath = 'gopher_authorized';
	var baseUrl = '{{ baseUrl }}';
	var redirectUri = '{{ redirectUri }}';
	var api = {}

	function isAuthorizing() {
		if (window.location.href.indexOf(oauthCallbackPath) === -1) {
			return false;
		}
		return true;
	}

	function logIn(cb) {
		if (checkLoginCookie()) {
			// If you're successfully logged in but still have a bunch of crap in the query string, fix it.
			if (isAuthorizing())
				window.location.assign(window.location.origin);
			api.loggedIn = true;
			cb();
		// We're currently getting an oauth token
		} else if (isAuthorizing()) {
			completeAuthorization(function(isLoggedIn) {
				api.loggedIn = isLoggedIn;
				if (isLoggedIn)
					cb();
			});
		} else {
			initiateGopherConnection();
		}
	}

	function displayError(err) {
		$('#error').removeClass('hide').append("<p>Error: " + JSON.stringify(err) + "</p>");
		console.log(err);
	}

	function displaySuccess(message) {
		$('#success').removeClass('hide').append(message);
	}

	function completeAuthorization(cb) {
		var code = getUrlParameter("code");
		var state = getUrlParameter("state");
		// if(Cookies.get('state') != state) {
		//     $('#error').removeClass('hide').append("<p>There was an authentication error. Please make sure your browser can accept cookies</p>");
		// }

		var getAuthTokenRequest = {
			url: baseUrl + 'gopherCallback?code=' + code,
			type: 'GET',
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			crossDomain: true,
			beforeSend: function() { NProgress.start();},
		};

		$.ajax(getAuthTokenRequest)
		.done(function (res) {
			displaySuccess("Successfully authorized the Gopher Reminder Service.");
			Cookies.set('fut_access_token', res.gopherAccessToken);
			console.log('access token', res.gopherAccessToken);
			onAuthSuccess(); //global
			console.log(res);
			NProgress.done();
			cb(true);
		}).fail(function (err) {
			displayError(err.responseText);
			NProgress.done();
			cb(false);
		});
	}

	function checkLoginCookie() {
		return Cookies.get('fut_access_token') ? true : false;
	}

	function initiateGopherConnection() {
		var connectGopherRequest = {
			url: baseUrl + 'connectGopher',
			type: 'GET',
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			crossDomain: true,
			beforeSend: function() { NProgress.start();}
		};

		$.ajax(connectGopherRequest)
		.done(function (res) {
			window.location.assign(res.authUri);
			NProgress.done();
		}).fail(function (err) {
			displayError("There was an error connecting to Gopher: " + err.responseText);
			NProgress.done();
		});
	}

	function fetchSettings(cb) {
		var getSettings = {
			url: baseUrl + 'getSettings',
			type: 'GET',
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			crossDomain: true,
			beforeSend: function() { NProgress.start(); },
		};
		$.ajax(getSettings)
		.done(function(res) {
			NProgress.done();
			cb(null, res.data);
		}).fail(function(err) {
			NProgress.done();
			cb(err, null);
		});

	}

	function populateSettingsForm(formElement, formItemSelector, settings) {
		var form = $(formElement);

		if (!settings) return;

		_.forEach(form.find(formItemSelector), function (settingsField) {
			switch (settingsField.type) {
				case 'checkbox':
					settingsField.checked = (settings[settingsField.id] == true);
					break;
				case 'radio':
					if (settingsField.value === settings[settingsField.name]) {
						settingsField.checked = true;
					}
					break;
				default:
					settingsField.value = settings[settingsField.id] || '';
			}
		});
	}

	function submitSettingsForm(formElement, formItemSelector) {
		var formData = {};

		_.forEach($(formElement).find(formItemSelector), function (settingsField) {
			switch (settingsField.type) {
				case 'checkbox':
					formData[settingsField.id] = settingsField.checked ? 1 : 0;
					break;
				case 'radio':
					if (settingsField.checked) formData[settingsField.name] = settingsField.value;
					break;
				default:
					formData[settingsField.id] = settingsField.value;
			}
		});

		saveSettings(formData);
	}

	function saveSettings(settings, cb) {
		NProgress.start();

		var postOptions = {
			url: baseUrl + 'saveSettings',
			type: 'POST',
			data: JSON.stringify(settings),
			dataType: 'json',
			processData : false,
			contentType: 'application/json; charset=utf-8',
			crossDomain: true,
			beforeSend: function() { NProgress.start();},
		};

		$.ajax(postOptions)
		.then(function (res) {
			NProgress.done();
			if (!_.isNil(cb)) cb(null);
		}).catch(function (err) {
			displayError('<p>Sorry, there was an error saving your options. Please try <a class="alert-link" href="/connectGopher">logging in again</a>. If this continues to be a problem please <a class="alert-link" href="http://help.followupthen.com/contact">contact us</a>.</p> (' + err.responseText + ')')
			NProgress.done();
			if (!_.isNil(cb)) cb(err);
		});
	}

	//https://stackoverflow.com/questions/19491336/get-url-parameter-jquery-or-how-to-get-query-string-values-in-js
	function getUrlParameter(sParam) {
		 var sPageURL = decodeURIComponent(window.location.search.substring(1)),
			 sURLVariables = sPageURL.split('&'),
			 sParameterName,
			 i;

		 for (i = 0; i<sURLVariables.length; i++) {
			 sParameterName = sURLVariables[i].split('=');
			 if (sParameterName[0] === sParam) {
				 return sParameterName[1] === undefined ? true : sParameterName[1];
			 }
		 }
	};

	api.baseUrl = baseUrl;
	api.displayError = displayError;
	api.displaySuccess = displaySuccess;
	api.gopherAccessToken = Cookies.get('fut_access_token');
	api.fetchSettings = fetchSettings;
	api.populateSettingsForm = populateSettingsForm;
	api.saveSettings = saveSettings;
	api.submitSettingsForm = submitSettingsForm;
	api.logIn = logIn;
	return api;
}

var gopherLogIn = function(cb) {
	var gopher = new GopherUtility();
	gopher.logIn(function() {
		cb(gopher);
	});
}