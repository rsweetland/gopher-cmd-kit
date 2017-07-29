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
	// debug('onPreview: Webhook Received:', event);
	let fut = new futUtils(event, context, callback);
	if (!fut.webhookValidated)
		return fut.respondError('Webhook validation failed');

    let bodyJson = {};
    try {
        bodyJson = JSON.parse(event.body);
    } catch (e) {
    }

    const command = _.get(bodyJson, 'command', '');
    const commandSplit = command.split('.');
    let commandParams = [];
    let flag = commandSplit[0];

    // has params
    if (commandSplit.length > 1) {
        commandParams = commandSplit.slice(1);
    }

    let valid = true;
    let complete = false;

    if (commandParams.length == 2) {
        complete = true;
    }

    var response = {
      "valid": valid,
      "complete": complete,
      "email_address": command + "@gopher.email",
      "description": "This is going to do something",
      "email_field": "bcc",
      "autocomplete": {
      "command": "ingatkan",
        "params": [
          {
            "param_name": "who",   // after the user kitchen "kitchen", all these handy objects are shown
            "options": [
              {
                "option_name": "me",
                "description": "Remind me only"
              },
              {
                "option_name": "everyone",
                "description": "Everyone in this email"
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

    if (!valid) {
      // early return?
    }

    if (commandParams.length > 1) {
      fut.getClient().resolveFormat({'format': commandParams[1]}, function (err, resolveFormatResponse) {
        if (err) {
          debug('status code', err.statusCode);
          // invalid format
          if (err.statusCode == 400) {
            response.valid = false;
            response.complete = false;
          }
        } else {
          debug(resolveFormatResponse);
          response.valid = response.valid && _.get(resolveFormatResponse, 'valid', false);
        }

        if (!response.valid) {
          response.complete = false;
        }

        return fut.respondOk(response);
      });
    } else {
      if (!response.valid) {
        response.complete = false;
      }

      return fut.respondOk(response);
    }
}
