'use strict';
const debug = require('debug')('fut-memorize:hooks:onFollowup');
const moment = require('moment');
const enml = require('enml-js');
const _ = require('lodash');
const config = require('../config');
const futUtils = require('./../lib/futUtils');

module.exports.main = (event, context, callback) => {
	debug('onFollowup: Webhook Received:', event);
	let fut = new futUtils(event, context, callback);
		
	let response = {};
	_.set(response, 'followup.message', 'You will receive this as a followup at increasing intervals');

	if (fut.isSimulation)
		return fut.respondOk(response);

	if (!fut.webhookValidated)
		return fut.repondError('No validate');

	return fut.respondOk(response);
}
