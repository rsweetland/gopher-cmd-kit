/**
 *
 * onUninstall – Gopher will delete the private data this user account stores.
 * If the command set up other resources, these can be terminated in this webhook.
 * 
 *
**/

'use strict';
const debug = require('debug')('gopher-cmd:hooks:onDelete');
const _ = require('lodash');
const futUtils = require('./../lib/futUtils');
const config = require('../config');

module.exports.main = (event, context, callback) => {
	debug('onUninstall Webhook Received:', event);
	let fut = new futUtils(event, context, callback);

	if (!fut.webhookValidated)
		return fut.respondError('Webhook validation failed');

	// process logic here
		
	return fut.respondOk({});
}