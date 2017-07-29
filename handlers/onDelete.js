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
const debug = require('debug')('gopher-cmd:hooks:onDelete');
const _ = require('lodash');
const futUtils = require('./../lib/futUtils');
const config = require('../config');

module.exports.main = (event, context, callback) => {
	debug('onDelete Received:', event);
	let fut = new futUtils(event, context, callback);

	if (!fut.webhookValidated)
		return fut.respondError('Webhook validation failed');

	// process delete logic
		
	if (fut.isSimulation)
		return fut.respondOk({});


	return fut.respondOk({});
}