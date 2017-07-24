'use strict';
var cookie = require('cookie');
const enml = require('enml-js');
const _ = require('lodash');
const moment = require('moment');
const futUtils = require('./../lib/futUtils');
const config = require('../config');

module.exports.main = (event, context, callback) => {
	debug('onCreate: Webhook Received:', event);
	let fut = new futUtils(event, context, callback);
		
	if (fut.isSimulation)
		return fut.respondOk({});

	if (!fut.webhookValidated)
		return fut.repondError('No validate');

	return fut.respondOk({});
}