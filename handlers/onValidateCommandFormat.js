/**
 *
 * onPreview Webhook – Fires each time a user
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
const debug = require('debug')('gopher-intro:hooks:onValidateCommandFormat');
const _ = require('lodash');
const moment = require('moment');
const google = require('googleapis');
const config = require('../config');
const GopherHelper = require('gopher-helper');

module.exports.main = (event, context, callback) => {
	// debug('onPreview: Webhook Received:', event);
	let gopher = new GopherHelper(event, context, callback, config.fut);

	// make sure this is a valid, signed webhook
	if (!gopher.webhookValidated)
		return gopher.respondError('Webhook validation failed');

	gopher.respondOk();
}
