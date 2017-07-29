/**
 *
 * Internal Helpers. You shouldn't have to change this.
 *
 *
**/

'use strict';
const debug = require('debug')('gopher-cmd:fut');
const cookie = require('cookie');
const qs = require('qs');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const futUtils = require('./../lib/futUtils');
const config = require('./../config');

module.exports.saveSettings = (event, context, callback) => {
	let fut = new futUtils(event, context, callback);

	if (!event.headers.Cookie)
		return respondErr('Please login before submitting request');
	
	const futAccessToken = cookie.parse(event.headers.Cookie).fut_access_token;

	if (!futAccessToken)
		return respondErr('Please login first!');

	const futClient = fut.getClient(futAccessToken);
	const settings = fut.parsedBody;

	futClient.saveExtData(settings)
	.then(fut.respondOk)
	.catch(fut.respondErr)
}

module.exports.getSettings = (event, context, callback) => {
	let fut = new futUtils(event, context, callback);

	if(!event.headers.Cookie)
		return respondErr('getSettings: Please login before submitting request');

	const futAccessToken = cookie.parse(event.headers.Cookie).fut_access_token;

	debug('futAccessToken', futAccessToken);

	if(!futAccessToken)
		return respondErr('Please login first!');

	const futClient = fut.getClient(futAccessToken);

	futClient.getExtData()
	.then(fut.respondOk)
	.catch(fut.respondErr)
};

// Authorize FUT
module.exports.connectFut = (event, context, callback) => {
	let fut = new futUtils(event, context, callback);

	const futClient = fut.getClient();
	const authUri = futClient.getAuthorizationUri().uri;
	const state = futClient.getAuthorizationUri().state;

	const body = {
		authUri: authUri,
		state: state
	}

	callback(null, {
		statusCode: 200,
		headers: {
		},
		body: JSON.stringify(body),
	})
}

// After user has verified account with FUT, retrieve and save accessToken
module.exports.futCallback = (event, context, callback) => {
	let fut = new futUtils(event, context, callback);

	debug('futCallback event: ', event);

	let futAccessToken = '';

	function saveAccessToken(token) {
		debug('code', event.queryStringParameters.code);
		debug('futCallback: saveAccessToken: token', token);
		futAccessToken = token;
		let futClient = fut.getClient(token);
		return futClient.saveExtData({fut_access_token: token}); //so access token now will be posted with each webhook
	}

	function sendResult() {
		let response = {
				statusCode: 200,
				headers: {
				},
				body: JSON.stringify({message: "Success!", futAccessToken: futAccessToken})
			}
			debug('futCallback ok response', response);
			callback(null, response);
	}

	function handleError(err) {
		debug('futCallback Error: ', err);
		debug('futCallback futClient', futClient);
		callback(null, {
			statusCode: 400,
			body: `There was a problem obtaining authorization from FollowUpThen based on this code: ${event.queryStringParameters.code}. Please try clearing your cookies, uninstalling and reinstalling the extension.`
		})
	}

	let futClient = fut.getClient();
	futClient.getAccessToken(event.queryStringParameters.code)
		.then(saveAccessToken)
		.then(sendResult)
		.catch(handleError);
}


//Renders static assets from the 'front-end' directory.
module.exports.renderFrontEnd = (event, context, callback) => {
	let fut = new futUtils(event, context, callback);

	let requestFileName = event.pathParameters ? event.pathParameters.page : 'index.html';
	let requestFilePath = path.join(__dirname, `../front-end/${requestFileName}`);

	let contentType = "text/html";
	if (requestFilePath.indexOf('\.css') !== -1) {
		contentType = "text/css";
	}

	if (!fs.existsSync(requestFilePath)) {
		return callback(null, {
			statusCode: 404,
			headers: {
				 "Access-Control-Allow-Origin" : "*",
				 "Access-Control-Allow-Credentials" : true
			},
			body: "404 File Not Found"
		})
	}

	let stat = fs.statSync(requestFilePath);
	let loadedFile = fs.readFileSync(requestFilePath, 'utf-8');

	if (contentType == 'text/html') {
		loadedFile = loadedFile.replace('{{ ext_api }}', config.extUrl);
		loadedFile = loadedFile.replace('{{ redirect_uri }}', config.redirectUri);
	}

	return callback(null, {
		statusCode: 200,
		headers: {
			"Access-Control-Allow-Origin" : "*",
			"Access-Control-Allow-Credentials" : true,
			'Content-Type': contentType,
			'Content-Length': stat.size
		},
		body: loadedFile
	});
}
