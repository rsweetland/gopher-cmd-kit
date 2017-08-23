/**
 *
 * onCreate Webhook – Fires when Gopher creates a new new followup reminder
 *
 * If your command creates a followup reminder it this webhook
 * is fired. Use it to synchronize due-dates, create add activities to
 * CRMs or project management systems.
 *
 * Examples:
 * - Add a contact to a CRM. Reply right away with
     social media and contact info to include with the reminder.
 * - Reply with a confirmation that some action has been done.
 *
**/

'use strict';
const debug = require('debug')('gopher-intro:hooks:onCreate');
const _ = require('lodash');
const config = require('../config');
const GopherHelper = require('gopher-helper');

module.exports.main = (event, context, callback) => {
	debug('onCreate: Webhook Received:', event);
	let gopher = new GopherHelper(event, context, callback, config.fut);

	// make sure this is a valid, signed webhook
	if (!gopher.webhookValidated)
		return gopher.respondError('Webhoook failed to validate');

	gopher.respondOk();
}