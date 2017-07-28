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