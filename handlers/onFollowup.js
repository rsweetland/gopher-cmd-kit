/**
 *
 * onFollowup Webhook
 *
 * If your command creates a reminder, it receives this hook when
 * the reminder triggers, just before it's sent. This lets you
 * do useful / productive / awesome things to make this an
 * extraordinary reminder. Reminders can be recurring, too.
 *
 * Examples:
 * - Send recurring updates to stay in touch with someone, pulling
     social media and contact info to include with the reminder.
 * - Email a request for update. Funnel the reply text into
 *   your project tracker.
 * - Get the weather in your inbox every day.
 * - Get the price of a product on a regular basis
 *
**/

'use strict';
const debug = require('debug')('gopher-cmd:hooks:onFollowup');
const _ = require('lodash');
const moment = require('moment');
const config = require('../config');
const GopherHelper = require('gopher-helper');
const logger = require('../lib/logger');

module.exports.main = (event, context, callback) => {
	debug('onFollowup: Webhook Request:', event);
	logger.log('remind: onFollowup event received');
	let gopher = new GopherHelper(event, context, callback, config.fut);
	if (!gopher.webhookValidated) {
		logger.log('remind: onFollowup failed webhook validation', {level: 'error', meta: {event: event}});
		return gopher.respondError(`Gopher had trouble connecting with the reminder system and cannot pull 
			your postpone and custom followup content at this time. We've been alerted the error. In meantime, 
			here is the original email that was scheduled for right now.`);
	}


	let response = {
		followup: {
			body: [
				{
					type: 'section',
					title: 'POSTPONE'
				},
			]
		}
	}

	var postponeTimes = _.get(gopher.user, 'postponeTimes', []);
	for(var i=0; i< postponeTimes.length; i++) {

		response.followup.body.push({
			type: 'button',
			text: postponeTimes[i],
			action: `postpone.${postponeTimes[i]}`,
			subject: `Hit send to postpone`,
			body: '',
		})
	}

	// response.followup.body.push({
	// 	    		type: 'html',
	// 	    		text: '<table width="100%" border="0"><tr><td>&nbsp;</td></tr></table>'
	// 	    	});

	logger.log('remind: onFollowup response', {meta: { response: JSON.stringify(response)}});
	return gopher.respondOk(response);
}