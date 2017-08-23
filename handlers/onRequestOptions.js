'use strict';
const debug = require('debug')('gopher-intro:hooks:onRequestOptions');
const _ = require('lodash');
const config = require('../config');
const GopherHelper = require('gopher-helper');
const Mixpanel = require('mixpanel');
const mixpanel = Mixpanel.init(config.mixpanel);

module.exports.main = (event, context, callback) => {

	debug('onRequestOptionsevent', event);
	if (process.env.TESTING) {
		var mock = require('../test/mock');
		event = mock.onRequestOptions;
	}

	// debug('onRequestOptions: Webhook Received:', event);
	let gopher = new GopherHelper(event, context, callback, config.fut);

	// make sure this is a valid, signed webhook
	if (!gopher.webhookValidated)
		return gopher.respondError('Webhook validation failed');

	return gopher.respondOk();
}
