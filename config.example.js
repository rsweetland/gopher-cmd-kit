
///////////// Update These Values /////////////////////////

const baseUrlLocal = 'http://ec2a422a9d.ngrok.io';
const baseUrlPublished = 'https://qafdeae8u9.execute-api.us-east-1.amazonaws.com/dev/';
const clientId = 'ext_da73ab1acb6b3d06cf785ujajaa6eab850';
const clientSecret = '4df690dfde03jskska4e0bd5c354093tq320b0515e4e6278f8faw45fae0114d697fd8f6';

//////////////////////////////////////////////////////////


let published = {};
let local = {};
const futURL = 'http://local.followupthen.com';  //TODO: Change to production

// LOCAL
local.exports = {
	baseUrl: baseUrlLocal,
	fut: {
		clientId: clientId,
		clientSecret: clientSecret,
		tokenHost: futURL,
		apiHost: futURL,
		tokenPath: futURL + '/api/v1/oauth2/access_token',
		authorizePath: futURL + '/settings/oauth2_authorize',
		redirectUri: baseUrlLocal + '/?fut_authorized=1',
		scope: 'get_user_info extension_manage_self manage_reminders',
		state: '49afjdskfdsjlk'
	}
}

// PUBLISHED TO AWS
published.exports = {
	baseUrl: baseUrlPublished,
	fut: {
		clientId: clientId,
		clientSecret: clientSecret,
		tokenHost: futURL,
		apiHost: futURL,
		tokenPath: futURL + '/api/v1/oauth2/access_token',
		authorizePath: futURL + '/futURL + settings/oauth2_authorize',
		redirectUri: baseUrlPublished + '/?fut_authorized=1',
		scope: 'get_user_info extension_manage_self manage_reminders',
		state: '49afjdskfdsjlk'
	}
}

module.exports = process.env.IS_OFFLINE ? local.exports : published.exports;
