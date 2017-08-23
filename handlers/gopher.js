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
const GopherHelper = require('gopher-helper');
const config = require('./../config');

module.exports.saveSettings = (event, context, callback) => {
	let gopher = new GopherHelper(event, context, callback, config.fut);

	if (!event.headers.Cookie)
		return gopher.respondError('Please login before submitting request');
	
	const futAccessToken = cookie.parse(event.headers.Cookie).fut_access_token;

	if (!futAccessToken)
		return gopher.respondError('Please login first!');

	const futClient = gopher.getClient(futAccessToken);
	const settings = gopher.parsedBody;

	futClient.saveExtData(settings)
	.then(gopher.respondOk)
	.catch(gopher.respondError)
}

module.exports.getSettings = (event, context, callback) => {
	let gopher = new GopherHelper(event, context, callback, config.fut);

	if(!event.headers.Cookie)
		return gopher.respondError('getSettings: Please login before submitting request');

	const futAccessToken = cookie.parse(event.headers.Cookie).fut_access_token;

	debug('futAccessToken', futAccessToken);

	if(!futAccessToken)
		return gopher.respondError('Please login first!');

	const futClient = gopher.getClient(futAccessToken);

	futClient.getExtData()
	.then(gopher.respondOk)
	.catch(gopher.respondError)
};

// Authorize FUT
module.exports.connectGopher = (event, context, callback) => {
	let gopher = new GopherHelper(event, context, callback, config.fut);

	const futClient = gopher.getClient();
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
module.exports.gopherCallback = (event, context, callback) => {
	let gopher = new GopherHelper(event, context, callback, config.fut);

	debug('futCallback event: ', event);

	let gopherAccessToken = '';

	function saveAccessToken(token) {
		debug('code', event.queryStringParameters.code);
		debug('gopherCallback: saveAccessToken: token', token);
		gopherAccessToken = token;
		let futClient = gopher.getClient(token);
		return futClient.saveExtData({fut_access_token: token}); //so access token now will be posted with each webhook
	}

	function sendResult() {
		let response = {
				statusCode: 200,
				headers: {
				},
				body: JSON.stringify({message: "Success!", gopherAccessToken: gopherAccessToken})
			}
			debug('gopherCallback ok response', response);
			callback(null, response);
	}

	function handleError(err) {
		debug('gopherCallback Error: ', err);
		debug('gopherCallback futClient', futClient);
		callback(null, {
			statusCode: 400,
			body: `There was a problem obtaining authorization from FollowUpThen based on this code: ${event.queryStringParameters.code}. Please try clearing your cookies, uninstalling and reinstalling the extension.`
		})
	}

	let futClient = gopher.getClient();
	futClient.getAccessToken(event.queryStringParameters.code)
		.then(saveAccessToken)
		.then(sendResult)
		.catch(handleError);
}


//Renders static assets from the 'front-end' directory.
module.exports.renderFrontEnd = (event, context, callback) => {
	debug('request path', event.path);

	let gopher = new GopherHelper(event, context, callback, config.fut);

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
		_.each(config.templateTokens, (value, slug) => {
			loadedFile = loadedFile.replace(`{{ ${slug} }}`, value);
		});
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
