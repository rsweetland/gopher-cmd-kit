/**
 * This config file lets you use the same codebase 
 * on localhost in production and local development.
 * When you're ready to deploy, run `sls deploy --stage prod`,
 * create a duplicate command and update the production section.
 */

var baseUrl, clientId, clientSecret, scope;
var apiUrl = 'https://www.gopher.email/';

if (process.env.IS_OFFLINE) {
	///////////////// LOCALHOST /////////////////////////////////////////////
	baseUrl = '';
	clientId = '';
	clientSecret = '';
	scope = 'get_user_info extension_manage_self manage_reminders read_reminders manage_logs read_logs read_tasks manage_tasks';
	//TODO: Generate scope in copy / paste setup code. For now, delete what you don't need.
	////////////////////////////////////////////////////////////////////////

} else {
	/////////////////  PRODUCTION (run `sls deploy --stage prod`) //////////
	baseUrl = '';
	clientId = '';
	clientSecret = '';
	scope = 'get_user_info extension_manage_self manage_reminders read_reminders manage_logs read_logs read_tasks manage_tasks';
	////////////////////////////////////////////////////////////////////////
}

const config = {
	baseUrl: baseUrl,
	gopherUrl: apiUrl,
	fut: {
		clientId: clientId,
		clientSecret: clientSecret,
		tokenHost: apiUrl,
		apiHost: apiUrl,
		tokenPath: apiUrl + 'api/v1/oauth2/access_token',
		authorizePath: apiUrl + 'settings/oauth2_authorize',
		redirectUri: baseUrl + '?gopher_authorized=1',
		scope: scope
	}
}

module.exports = config;
