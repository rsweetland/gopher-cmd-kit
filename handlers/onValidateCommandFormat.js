/**
 *
 * onValidateCommand Format – Fires as a user is typing in their Gopher command
 *
 * Use it to check if user hs proper credentials stored in his privateData,
 * to preview date formats and go let user know what their command will do.
 *
**/

'use strict';
const debug = require('debug')('gopher-cmd:hooks:onValidateCommandFormat');
const _ = require('lodash');
const config = require('../config');
const GopherHelper = require('gopher-helper');
const moment = require('moment');
var response = {};

module.exports.main = (event, context, callback) => {
    // debug('onValidateCommandFormat: Webhook Received:', event);

    if(process.env.TESTING) {
        debug('Mocked Events....');
        var mock = require('../test/mock');
        event = mock.onValidateCommandFormat;
    }

    let gopher = new GopherHelper(event, context, callback, config.fut);
    if (!gopher.webhookValidated) return gopher.respondError('Webhook validation failed');


    // Get Command Params
    var recipientOption = gopher.commandOptions[0];  //ex remind.{recipientOption}.3days
    var timeStringOption = gopher.commandOptions[1]; //ex remind.recipient.{timeStringOption}

    // If not params given, use defaults
    // if(!recipientOption && !timeStringOption) {
    //     let defaultCommand = _.get(gopher.userData, 'default_command', 'remind.me.3days');
    //     gopher.setCommand(defaultCommand);
    //     recipientOption = gopher.commandOptions[0];
    //     timeStringOption = gopher.commandOptions[1];
    //     var defaultsUsed = true;
    // }

    //
    if(!recipientOption) {
        return gopher.respondOk({
            valid: "info",
            description: "Who would you like to remind?"
        })
    }

    if(!timeStringOption) {
        return gopher.respondOk({
            valid: "info",
            description: "Type any time, plain English without spaces"
        })
    }

    

    // Build response
    let valid = true;
    response = {
      "valid": valid,
      "description": "Reminds you at this moment: " + timeStringOption,
    };

    function handleValidDate (validDateResponse) {
        const dueFriendly = moment(validDateResponse.due).format('dddd D MMM, \'YY [at] h:mma');
        debug('validDateResponse', validDateResponse);
        if (recipientOption === 'everyone') {
            response.description = "Reminds everone in 'to' and 'cc' <span style='white-space: nowrap'>" + dueFriendly
        } else {
            response.description = "Sets a reminder for only you <span style='white-space: nowrap'>" + dueFriendly  + "</span>";
        }
        response.valid = validDateResponse.valid;
        if(!response.valid) response.description = `We don't recognize that date just yet. <a target='_blank' href='${config.gopherUrl}/how#timeformats'>Date formats</a>.`;
        return gopher.respondOk(response);
    }

    function handleInvalidResponse (invalidResponse) {
        debug('invalid response', invalidResponse);
        if(invalidDateResponse.statusCode == 400) { //invalid Date TODO: Beter error handling
            console.l0g('invalid date');
            invalidResponse.description = "We don't yet recognize that format";
            return gopher.respondOk(invalidResponse)
        } else {
            return gopher.respondError(invalidResponse);
        }
    }

    if (timeStringOption) {
        gopher.getClient().resolveFormat({'format': timeStringOption, 'timezone': _.get(gopher.user, 'timezone', 'GMT')})
            .then(handleValidDate)
            .catch(handleInvalidResponse)
        }

}
