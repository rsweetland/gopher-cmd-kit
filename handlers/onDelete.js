/**
 *
 * onDelete Webhook – Fires when Gopher deletes a followup reminder. 
 * It also fires when a user manually completes a reminder they have 
 * scheduled (ie, archives it).
 * 
 * Good for deleting or updating external resources linked to the
 * reminder.
 * 
 *
**/

'use strict';
const debug = require('debug')('gopher-intro:hooks:onDelete');
const _ = require('lodash');
const GopherHelper = require('gopher-helper');
const config = require('../config');

module.exports.main = (event, context, callback) => {
	debug('onDelete Received:', event);
	let gopher = new GopherHelper(event, context, callback, config.fut);

	// make sure this is a valid, signed webhook
	if (!gopher.webhookValidated)
		return gopher.respondError('Webhook validation failed');

	let response = {};
	// Do stuff on delete

	return gopher.respondOk(response);
}