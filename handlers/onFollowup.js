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

module.exports.main = (event, context, callback) => {
	debug('onFollowup: Webhook Request:', event);
	let gopher = new GopherHelper(event, context, callback, config.fut);
	if (!gopher.webhookValidated) {
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
				}
			],
			body_external: [
			    {
			    	type: 'html',  // note: old-fashioned tables are a reliable way layout an HTML email.
			    	text: `Hi, just making sure this last email came through ok.`
			    }
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

	return gopher.respondOk(response);
}