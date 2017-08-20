/**
 *
 * onCommand Webhook – Fires on every Gopher Command (ex: command.param.param@gopher.email)
 *
 * Examples:
 * - Add a contact to a CRM. Reply right away with
     social media and contact info to include with the reminder.
 * - Reply with a confirmation that some action has been done.
 *
**/

'use strict';
const debug = require('debug')('gopher-cmd:hooks:onCommand');
const _ = require('lodash');
const config = require('../config');
const logger = require('../lib/logger');
const GopherHelper = require('gopher-helper');
const Mixpanel = require('mixpanel');
const mixpanel = Mixpanel.init(config.mixpanel);

// process.env.TESTING = true;

module.exports.main = (event, context, callback) => {
	if (process.env.TESTING) {
		event = require('../test/mock.js').onActionEvent;
	}

	let gopher = new GopherHelper(event, context, callback, config.fut); //magic helpers
	
	if (!gopher.webhookValidated){
		debug('webhook validation failed');
		return gopher.respondError('Gopher is having connection troubles');
	}

	let sourceEmail = gopher.source.from;
	let parsedName = sourceEmail;

	let email = {
		subject: 'Gopher Demo Day Email',
		body: []
	};

	email.body.push({
		type: 'html',
		text: `<h2>Hi ${parsedName}, Hope you\'re enjoying Demo Day! Here are some demos you can try:</h2>`
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
		text: `<p>&nbsp;</p>`
	});

	gopher.sendEmail(email);
	return gopher.respondOk();
}