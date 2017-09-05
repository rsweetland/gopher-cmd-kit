	/**
 *
 * onUpdate Webhook – Fires when someone updates a followup
 * reminder, usually in the form of postponing it. You can do everything
 * here that you can in onFollowup.
 *
 * Examples:
 * - Keep a to-do list due-date synchronized with a Gopher followup
 *   due-date
 * - Keep a calendar appointment synchronized with a Gopher followup
 *   due-date
 *
**/

'use strict';
const debug = require('debug')('gopher-cmd:hooks:onUpdate');
const _ = require('lodash');
const futUtils = require('./../lib/futUtils');
const config = require('../config');

module.exports.main = (event, context, callback) => {
	debug('Webhook Received:', event);
	let fut = new futUtils(event, context, callback);

	if (fut.isSimulation)
		return fut.respondOk({});

	if (!fut.webhookValidated)
		return fut.respondError('Webhook validation failed');

	return fut.respondOk({});
}