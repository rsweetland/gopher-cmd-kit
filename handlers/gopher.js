/**
 *
 * Helpers for standard stuff. You shouldn't have to change this.
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
const logger = require('./../lib/logger');

module.exports.saveSettings = (event, context, callback) => {
	let gopher = new GopherHelper(event, context, callback, config.fut);

	if (!event.headers.Cookie)
		return respondError('Please login before submitting request');
	
	const gopherAccessToken = cookie.parse(event.headers.Cookie).fut_access_token;

	if (!gopherAccessToken)
		return gopher.respondError('Please login first!');

	const gopherClient = gopher.getClient(gopherAccessToken);
	const settings = gopher.parsedBody;

	gopherClient.saveExtData(settings)
	.then(gopher.respondOk)
	.catch(gopher.respondError)
}

module.exports.getSettings = (event, context, callback) => {
	debug('settings requested');
	logger.log('remind: settings requested');
	let gopher = new GopherHelper(event, context, callback, config.fut);
	debug('gopher helper created');

	if(!event.headers.Cookie)
		return gopher.respondError('getSettings: Please login before submitting request');

	const gopherAccessToken = cookie.parse(event.headers.Cookie).fut_access_token;

	debug('gopherAccessToken', gopherAccessToken);

	if(!gopherAccessToken)
		return gopher.respondError('Please login first!');

	const gopherClient = gopher.getClient(gopherAccessToken);

	gopherClient.getExtData()
	.then(gopher.respondOk)
	.catch(gopher.respondError)
};

// Authorize FUT
module.exports.connectGopher = (event, context, callback) => {
	let gopher = new GopherHelper(event, context, callback, config.fut);

	const gopherClient = gopher.getClient();
	const authUri = gopherClient.getAuthorizationUri().uri;
	const state = gopherClient.getAuthorizationUri().state;

	const body = {
		authUri: authUri,
		state: state
	}

	callback(null, {
		statusCode: 200,
		headers: {
		    "Access-Control-Allow-Origin" : "*", 
		    "Access-Control-Allow-Credentials" : true
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
		debug('futCallback: saveAccessToken: token', token);
		gopherAccessToken = token;
		let gopherClient = gopher.getClient(token);
		return gopherClient.saveExtData({fut_access_token: token}); //so access token now will be posted with each webhook
	}

	function sendResult() {
		let response = {
				statusCode: 200,
				headers: {
				},
				body: JSON.stringify({message: "Success!", gopherAccessToken: gopherAccessToken})
			}
			debug('futCallback ok response', response);
			callback(null, response);
	}

	function handleError(err) {
		debug('futCallback Error: ', err);
		debug('futCallback gopherClient', gopherClient);
		callback(null, {
			statusCode: 400,
			body: `There was a problem obtaining authorization from FollowUpThen based on this code: ${event.queryStringParameters.code}. Please close this window and try again. You can also clear your cookies, uninstall and re-install the command.`
		})
	}

	let gopherClient = gopher.getClient();
	gopherClient.getAccessToken(event.queryStringParameters.code)
		.then(saveAccessToken)
		.then(sendResult)
		.catch(handleError);
}


//Renders static assets from the 'front-end' directory.
module.exports.renderFrontEnd = (event, context, callback) => {
	let gopher = new GopherHelper(event, context, callback, config.fut);

	let requestFileName = event.pathParameters ? event.pathParameters.page : 'index.html';
	let requestFilePath = path.join(__dirname, `../front-end/${requestFileName}`);

	let contentType = "text/html";
	if (requestFilePath.indexOf('\.css') !== -1) {
		contentType = "text/css";
	}

	if (!fs.existsSync(requestFilePath)) {
		logger.log('404 request error', {meta: {event: JSON.stringify(event)}});
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
		loadedFile = loadedFile.replace('{{ baseUrl }}', config.baseUrl);
		loadedFile = loadedFile.replace('{{ redirectUri }}', config.redirectUri);
	}

	logger.log('static page load', {meta: {path: event.path}});
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
