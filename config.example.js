if (process.env.IS_OFFLINE) {
	/////////////////LOCAL PLUGIN STAGING API/////////////////////////////////////////////
	var baseUrlLocal = 'http://48q348aj.ngrok.io/';
	var clientId = 'ext_84f92e66fdsafdsacc0a5d8ba87';
	var clientSecret = '1a28a48492698862bfdsafdsafds4ad66781fde696d37db7fdf9d10cd90d9';
	var futURL = 'https://www.followupthen.com/';
	/////////////////////////////////////////////////////////////////////////////////////////////////////////LOCAL PLUGIN STAGING API/////////////////////////////////////////////

} else {
	/////////////////SERVERLESS PLUGIN PRODUCTION API  (sls deploy --stage prod) //////////////
	var baseUrlLocal = 'https://oqy32452WS0ft7.execute-api.us-east-1.amazonaws.com/prod/';
	var clientId = 'ext_60fa1f66f453Q3Q1d41ff8c26de5';
	var clientSecret = '9f4c14a48389uj39aba38239fc8bfb99896a2609c777f888151a010073';
	var futURL = 'https://www.followupthen.com/';
	/////////////////////////////////////////////////////////////////////
}


const config = {
	baseUrl: baseUrlLocal,
	gopherUrl: futURL,
	fut: {
		clientId: clientId,
		clientSecret: clientSecret,
		tokenHost: futURL,
		apiHost: futURL,
		tokenPath: futURL + 'api/v1/oauth2/access_token',
		authorizePath: futURL + 'settings/oauth2_authorize',
		redirectUri: baseUrlLocal + '?gopher_authorized=1',
		scope: 'get_user_info extension_manage_self manage_reminders',
	}
}

module.exports = config;