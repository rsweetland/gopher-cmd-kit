/**
 *
 * onCommand Webhook – Fires every time Gopher receives a command.
 *
 * When Gopher receives a gopher command by email (ex command.param.param@gopher.email) this hook is fired.
 *
 * Examples:
 * - Add a contact to a CRM and reply right away with
	 social media and contact info.
 * - Reply with a confirmation that some action has been done.
 *
**/

'use strict';
const debug = require('debug')('gopher-intro:hooks:onCommand');
const _ = require('lodash');
const moment = require('moment-timezone');
const config = require('../config');
const GopherHelper = require('gopher-helper');
const logger = require('../lib/logger');
const Mixpanel = require('mixpanel');
const mixpanel = Mixpanel.init(config.mixpanel);
const async = require('async');

process.env.TESTING = true;	

module.exports.main = (event, context, callback) => {
	console.log('onCommand');
	if (process.env.TESTING) {
		console.log('mocked');
		var mock = require('../test/mock');
		event = mock.onCommand;
	}

	let gopher = new GopherHelper(event, context, callback, config.fut);
	logger.log('intro: onCommand webhook received');
	debug('onCommand webhook received', event);

	// make sure this is a valid, signed webhook
	if (!process.env.TESTING && !gopher.webhookValidated)
		return gopher.respondError('Webhook validation failed');

	let to = gopher.source.to.join(',');
	let from = gopher.source.from;
	
	// Generate followup

	const futAddress = 	`1sec-${gopher.commandName}@gopher.email`;

	let userData = gopher.getUserData();

	var reminderParams = {
		timezone: gopher.user.timezone,
		source: {
			from: gopher.source.from,
			subject: 'Reilly Sweetland | Gopher',
			body: '<p></p>',
			type: 'api'
		}
	};

	reminderParams.source.recipients_to = to;
	reminderParams.source.recipient_server = futAddress;

	let client = gopher.getClient(userData.fut_access_token);
	// gopher.createFollowup('1sec', to);
	client.createFut(reminderParams);

	return gopher.respondOk();
}