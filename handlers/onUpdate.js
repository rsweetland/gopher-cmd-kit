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
const debug = require('debug')('gopher-intro:hooks:onUpdate');
const _ = require('lodash');
const GopherHelper = require('gopher-helper');
const moment = require('moment-timezone');
const striptags = require('striptags');
const config = require('../config');
const logger = require('../lib/logger');
const Mixpanel = require('mixpanel');
const mixpanel = Mixpanel.init(config.mixpanel);

module.exports.main = (event, context, callback) => {
	console.log(event);
	return;
	debug('Webhook Received:', event);
	let gopher = new GopherHelper(event, context, callback, config.fut);

	// make sure this is a valid, signed webhook
	if (!gopher.webhookValidated)
		return gopher.respondError('Webhook validation failed');

	let response = {};
	// Do stuff on update

	return gopher.respondOk(response);
}