/**
 *
 * onPreview Webhook – Fires each time a user
 *
 * If your command creates a followup reminder it this webhook
 * is fired. Use it to synchronize due-dates, create add activities to
 * CRMs or project management systems.
 *
 * Examples:
 * - Add a contact to a CRM. Reply right away with
     social media and contact info to include with the reminder.
 * - Reply with a confirmation that some action has been done.
 *
**/

'use strict';
const debug = require('debug')('gopher-cmd:hooks:onPreview');
const _ = require('lodash');
const config = require('../config');
const futUtils = require('./../lib/futUtils');

module.exports.main = (event, context, callback) => {
	debug('onPreview: Webhook Received:', event);
	let fut = new futUtils(event, context, callback);
	if (!fut.webhookValidated)
		return fut.respondError('Webhook validation failed');

	var response = {
		"valid": true,
		"complete": true,
		"email_address": "kitchen.sink@gopher.email",
		"description": "This is going to do something",
		"email_field": "bcc",
		"autocomplete": {
		"command": "kitchen",
	    "params": [
	      {
	        "param_name": "object",   // after the user kitchen "kitchen", all these handy objects are shown
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
	      },
	      {
	        "param_name": "when",   // after the user types "kitchen", they are shown all of these
	        "options": [
	          {
	            "option_name": "1day"
	          },
	          {
	            "option_name": "1week",
	          },
	          {
	            "option_name": "1month",
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
