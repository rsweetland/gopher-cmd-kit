'use strict';
const debug = require('debug')('fut-memorize:hooks:onCreate');
const _ = require('lodash');
const config = require('../config');
const futUtils = require('./../lib/futUtils');

module.exports.main = (event, context, callback) => {
	debug('onCreate: Webhook Received:', event);
	let fut = new futUtils(event, context, callback);
		
	if (fut.isSimulation)
		return fut.respondOk({});

	if (!fut.webhookValidated)
		return fut.respondError('No validate');

	return fut.respondOk({});
}