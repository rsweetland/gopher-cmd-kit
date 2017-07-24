
var FUTUtility = function() {
	var oauthCallbackPath = 'fut_authorized';
	var apiHost = '{{ ext_api }}';
	var redirectUri = '{{ redirect_uri }}';
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
			initiateFutConnection();
		}
	}

	function displayError(err) {
		$('#error').removeClass('hide').append("<p>Error: " + err + "</p>");
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
			url: apiHost + '/futCallback?code=' + code,
			type: 'GET',
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			crossDomain: true,
			beforeSend: function() { NProgress.start();},
		};

		$.ajax(getAuthTokenRequest)
		.done(function (res) {
			displaySuccess("Successfully Authorized FollowUpThen");
			Cookies.set('fut_access_token', res.futAccessToken);
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

	function initiateFutConnection() {
		var connectFutRequest = {
			url: apiHost + '/connectFut',
			type: 'GET',
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			crossDomain: true,
			beforeSend: function() { NProgress.start();}
		};

		$.ajax(connectFutRequest)
		.done(function (res) {
			window.location.assign(res.authUri);
			NProgress.done();
		}).fail(function (err) {
			displayError("<p>There was an error connecting to FollowUpthen: " + err.responseText + "</p>");
			NProgress.done();
		});
	}

	function fetchSettings(cb) {
		var getSettings = {
			url: apiHost + '/getSettings',
			type: 'GET',
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			crossDomain: true,
			beforeSend: function() {NProgress.start();},
		};
		$.ajax(getSettings)
		.done(function(res) {
			NProgress.done();
			cb(res.data, null);
		}).fail(function(err) {
			NProgress.done();
			cb(null, err);
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
		NProgress.start();

		var postOptions = {
			url: apiHost + '/saveSettings',
			type: 'POST',
			data: {},
			dataType: 'json',
			processData : false,
			contentType: 'application/json; charset=utf-8',
			crossDomain: true,
			beforeSend: function() { NProgress.start();},
		};

		_.forEach($(formElement).find(formItemSelector), function (settingsField) {
			switch (settingsField.type) {
				case 'checkbox':
					postOptions.data[settingsField.id] = settingsField.checked ? 1 : 0;
					break;
				case 'radio':
					if (settingsField.checked) postOptions.data[settingsField.name] = settingsField.value;
					break;
				default:
					postOptions.data[settingsField.id] = settingsField.value;
			}
		});

		postOptions.data = JSON.stringify(postOptions.data);

		$.ajax(postOptions)
		.then(function (res) {
			displaySuccess('<p>You\'re all set!</p>');
			NProgress.done();
		}).catch(function (err) {
			displayError('<p>Sorry, there was an error saving your options. Please try <a class="alert-link" href="/connectFut">logging in again</a>. If this continues to be a problem please <a class="alert-link" href="http://help.followupthen.com/contact">contact us</a>.</p> (' + err.responseText + ')')
			NProgress.done();
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

	api.apiHost = apiHost;
	api.futAccessToken = Cookies.get('fut_access_token');
	api.fetchSettings = fetchSettings;
	api.populateSettingsForm = populateSettingsForm;
	api.submitSettingsForm = submitSettingsForm;
	api.logIn = logIn;
	return api;
}

var futLogIn = function(cb) {
	var fut = new FUTUtility();
	fut.logIn(function() {
		cb(fut);
	});
}