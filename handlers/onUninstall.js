/**
 *
 * onUninstall – Gopher will delete the private data this user account stores.
 * If the command set up other resources, these can be terminated in this webhook.
 * 
 *
**/

'use strict';
const debug = require('debug')('gopher-intro:hooks:onDelete');
const _ = require('lodash');
const GopherHelper = require('gopher-helper');
const config = require('../config');

module.exports.main = (event, context, callback) => {
	debug('onUninstall Webhook Received:', event);
	let gopher = new GopherHelper(event, context, callback, config.fut);

	// make sure this is a valid, signed webhook
	if (!gopher.webhookValidated)
		return gopher.respondError('Webhook validation failed');

	let response = {};
	// Do stuff on uninstall

	return gopher.respondOk(response);
}