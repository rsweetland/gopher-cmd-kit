gopherLogIn(function(gopher) {
	gopher.fetchSettings(function(err, settings) {
		if (err) {
			console.log(err);
			Cookies.remove('fut_access_token');
			return gopher.displayError("Sorry, Gopher had trouble logging in. Please refresh the page to login again.");
		}
		if (!settings || (settings.fut_access_token === 'undefined')) { //if the fut_auth_token has been removed on the server, remove from client.
			Cookies.remove('fut_access_token');
			return location.reload();
		}
	})
});