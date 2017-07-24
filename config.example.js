let production = {};
let local = {};

const devServerlessURL = 'http://268dd2e7.ngrok.io';
const productionServerlessURL = 'https://pu3sj0waah.execute-api.us-east-1.amazonaws.com/dev/';
const futURL = 'http://staging1.www.fut.io';

// DEV
local.exports = {
	extUrl: devServerlessURL,
	fut: {
		clientId: 'ext_318b7a0e22de3fe1b9b91654cd760700',
		clientSecret: '83a34c94b69b4ae99c8c1e176cbb478d20cafb784b4df5ed73bf06e8a02df0bc',
		tokenHost: futURL,
		apiHost: futURL,
		tokenPath: futURL + '/api/v1/oauth2/access_token',
		authorizePath: futURL + '/futURL + settings/oauth2_authorize',
		redirectUri: devServerlessURL + '/?futCallback=1',
		scope: 'get_user_info extension_manage_self manage_reminders',
		state: '49afjdskfdsjlk'
	}
}


// PRODUCTION
production.exports = {
	extUrl: productionServerlessURL,
	fut: {
		clientId: 'ext_318b7a0e22de3fe1b9b91654cd760700',
		clientSecret: '83a34c94b69b4ae99c8c1e176cbb478d20cafb784b4df5ed73bf06e8a02df0bc',
		tokenHost: futURL,
		apiHost: futURL,
		tokenPath: futURL + '/api/v1/oauth2/access_token',
		authorizePath: futURL + '/futURL + settings/oauth2_authorize',
		redirectUri: devServerlessURL + '/?futCallback=1',
		scope: 'get_user_info extension_manage_self manage_reminders',
		state: '49afjdskfdsjlk'
	}
}

module.exports = process.env.IS_OFFLINE ? local.exports : production.exports;
