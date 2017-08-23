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
const debug = require('debug')('gopher-intro:hooks:onFollowup');
const _ = require('lodash');
const moment = require('moment');
const config = require('../config');
const logger = require('../lib/logger');
const async = require('async');
const GopherHelper = require('gopher-helper');

// process.env.TESTING = true;	

module.exports.main = (event, context, callback) => {
	console.log('onFollowup');
	if (process.env.TESTING) {
		console.log('mocked');
		var mock = require('../test/mock');
		event = mock.onFollowup;
	}

	let gopher = new GopherHelper(event, context, callback, config.fut);
	debug('onFollowup: Webhook Request:', event);
	
	// make sure this is a valid, signed webhook
	if (!process.env.TESTING && !gopher.webhookValidated)
		return gopher.respondError('Webhook validation failed');

	let email = {
		subject: 'Reilly Sweetland | Gopher',
		body: []
	};

	email.body.push({
		type: 'html',
		text: `<h2>Reilly Sweetland</h2>
		<p>Founder | Gopher</p>
		<p>reilly@humans.fut.io</p>
		<p>m: 408.515.6995</p>`
	});

	email.body.push({
		type: 'section',
		title: 'DEMOS'
	});

	email.body.push({
		type: 'button',
		text: 'Salesforce',
		action: 'salesforce',
		subject: "Hit send to receive the Salesforce email demo",
	});

	email.body.push({
		type: 'button',
		text: 'Producthunt',
		action: 'producthunt',
		subject: "Hit send to receive the Producthunt email demo",
	});

	email.body.push({
		type: 'button',
		text: 'Github',
		action: 'github',
		subject: "Hit send to receive the Github email demo",
	});

	email.body.push({
		type: 'html',
		text: '<p>&nbsp;</p>'
	});	

	email.body.push({
		type: 'section',
		title: 'FOLLOW UP WITH REILLY'
	});

	let postponeTimes = ['1sec', '1day', '2d', '3d', '1wk', '2wk', '1mo'];
	for (var i=0; i< postponeTimes.length; i++) {

		email.body.push({
			type: 'button',
			text: postponeTimes[i],
			action: `postpone.${postponeTimes[i]}`,
			subject: `Hit send to postpone`,
			body: '',
		})
	}

	gopher.sendEmail(email);

	return gopher.respondOk();
}