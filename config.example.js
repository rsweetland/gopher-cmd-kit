/**
 * This config file lets you use the same codebase 
 * on localhost in production and local development.
 * When you're ready to deploy, run `sls deploy --stage prod`,
 * create a duplicate command and update the production section.
 */

var baseUrl, clientId, clientSecret;
var futURL = 'https://www.followupthen.com/';

if (process.env.IS_OFFLINE) {
	///////////////// LOCALHOST /////////////////////////////////////////////
	baseUrl = '';
	clientId = '';
	clientSecret = '';
	////////////////////////////////////////////////////////////////////////

} else {
	/////////////////  PRODUCTION (run `sls deploy --stage prod`) //////////
	baseUrl = '';
	clientId = '';
	clientSecret = '';
	////////////////////////////////////////////////////////////////////////
}

const config = {
	baseUrl: baseUrl,
	gopherUrl: futURL,
	fut: {
		clientId: clientId,
		clientSecret: clientSecret,
		tokenHost: futURL,
		apiHost: futURL,
		tokenPath: futURL + 'api/v1/oauth2/access_token',
		authorizePath: futURL + 'settings/oauth2_authorize',
		redirectUri: baseUrl + '?gopher_authorized=1',
		scope: 'get_user_info extension_manage_self manage_reminders'
	}
}

module.exports = config;
