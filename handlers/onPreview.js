'use strict';
const debug = require('debug')('gopher-cmd:hooks:onPreview');
const _ = require('lodash');
const config = require('../config');
const futUtils = require('./../lib/futUtils');

module.exports.main = (event, context, callback) => {
	debug('onFollowup: Webhook Received:', event);
	let fut = new futUtils(event, context, callback);
	if (!fut.webhookValidated)
		return fut.respondError('Webhook validation failed');
		
	var response = {
		"valid": true,
		"complete": true,
		"email_address": "kitchen@gopher.email",
		"description": "This is going to do something",
		"email_field": "bcc",
		"autocomplete": {
		"command": "kitchen",
	    "params": [
	      {
	        "param_name": "object",
	        "options": [
	          {
	            "option_name": "sink",
	            "description": "Taco Corp > Tacos > 2016 Redesign > designs"
	          },
	          {
	            "option_name": "soap",
	            "description": "Taco Corp > Tacos > 2016 Redesign > proposals"
	          },
	          {
	            "option_name": "faucet",
	            "description": "Venter Surboards > 2017 > Layouts"
	          },
	          {
	            "option_name": "dishes",
	            "description": "Venter Surboards > 2017 > Layouts"
	          }
	        ]
	      }
	    ]
	  }
	};

	if (fut.isSimulation)
		return fut.respondOk(response);

	return fut.respondOk(response);
}
