'use strict';
const debug = require('debug')('fut-intro:hooks:onFollowup');
const moment = require('moment');
const enml = require('enml-js');
const _ = require('lodash');
const GopherHelper = require('gopher-helper');
const config = require('../config');

module.exports.main = (event, context, callback) => {
	debug('onFollowup: Webhook Received:', event);
	let gopher = new GopherHelper(event, context, callback, config.fut);
		
	let response = {};

	if (!gopher.webhookValidated)
		return gopher.repondError('No validate');

	return gopher.respondOk(response);
}
