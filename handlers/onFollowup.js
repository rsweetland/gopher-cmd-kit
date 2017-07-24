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
	
	const due = _.get(fut.parsedBody, 'followup.due');
	const created = _.get(fut.parsedBody, 'followup.created');
	const settingsMultiplier = _.get(fut.parsedBody, 'followup.extension.private_data.memorize_frequency_multiplier')

	if (!settingsMultiplier)
		settingsMultiplier = 1;

	let postponedCount = _.get(fut.parsedBody, 'followup.extension.followup_data.postponed_count', 1);
	let delayMultiplier = 2 * postponedCount * settingsMultiplier;

	let response = {};
	_.set(response, 'followup.send', true);
	_.set(response, 'followup.due', created + (due-created) * delayMultiplier);
	_.set(response, 'followup.extension.followup_data.postponed_count', postponedCount+1);

	if (fut.isSimulation)
		return fut.respondOk(response);

	if (!fut.webhookValidated)
		return fut.repondError('No validate');

	return fut.respondOk(response);
}