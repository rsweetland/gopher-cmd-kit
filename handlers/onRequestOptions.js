/**
 *
 * onPreview Webhook – Fires as a user is typing in their Gopher command
 *
 * Use it to check if user hs proper credentials stored in his privateData,
 * to preview date formats and go let user know what their command will do.
 *
**/

'use strict';
const debug = require('debug')('gopher-cmd:hooks:onRequestOptions');
const _ = require('lodash');
const config = require('../config');
const GopherHelper = require('gopher-helper');

module.exports.main = (event, context, callback) => {
    debug('onRequestOptions: Webhook Received:', event);
    let gopher = new GopherHelper(event, context, callback, config.fut);

    if (!gopher.webhookValidated)
        return gopher.respondError('Webhook validation failed');

    if(process.env.TESTING) {
        debug('Mocked Events....');
        var mock = require('../test/mock');
        event = mock.onRequestOptions;
    }

    var response = {
        "command_url": config.baseUrl, //todo: should be only one
        "params": [
          {
            "param_name": "who",
            "param_description": "Who would you like to remind?",
            "options": [
              {
                "option_name": "me",
                "description": "Remind only me"
              },
              {
                "option_name": "everyone",
                "description": "Everyone in the 'to' and 'cc' fields"
              }
              ]
          },
          {
            "param_name": "when",
            "param_description": "Type date in plain English, no spaces",
            "options": [
                {option_name: "1day"},
                {option_name: "2days"},
                {option_name: "3days"},
                {option_name: "4days"},
                {option_name: "5days"},
                {option_name: "6days"},
                {option_name: "8days"},
                {option_name: "9days"},
                {option_name: "10days"},
                {option_name: "1week"},
                {option_name: "2weeks"},
                {option_name: "3weeks"},
                {option_name: "4weeks"},
                {option_name: "5weeks"},
                {option_name: "6weeks"},
                {option_name: "1month"},
                {option_name: "2months"},
                {option_name: "3months"},
                {option_name: "4months"},
                {option_name: "5months"},
                {option_name: "6months"},
                {option_name: "1year"},
                {option_name: "monday"},
                {option_name: "tuesday"},
                {option_name: "wednesday"},
                {option_name: "thursday"},
                {option_name: "friday"},
                {option_name: "saturday"},
                {option_name: "sunday"},
                {option_name: "tomorrow"},
                {option_name: "nextweek"},
                {option_name: "nextmonth"},
                {option_name: "nextyear"},
                {option_name: "2hours"},
                {option_name: "3hours"},
                {option_name: "4hours"},
                {option_name: "5hours"},
                {option_name: "6hours"},
                {option_name: "7hours"},
                {option_name: "8hours"},
                {option_name: "9hours"},
                {option_name: "10hours"},
                {option_name: "12hours"},
                {option_name: "15hours"},
                {option_name: "20hours"},
                {option_name: "1pm"},
                {option_name: "2pm"},
                {option_name: "3pm"},
                {option_name: "4pm"},
                {option_name: "5pm"},
                {option_name: "6pm"},
                {option_name: "7pm"},
                {option_name: "8pm"},
                {option_name: "9pm"},
                {option_name: "10pm"},
                {option_name: "7am"},
                {option_name: "8am"},
                {option_name: "9am"},
                {option_name: "10am"},
                {option_name: "11am"},
                {option_name: "12pm"},
                {option_name: "weekdays"},
                {option_name: "january"},
                {option_name: "february"},
                {option_name: "march"},
                {option_name: "april"},
                {option_name: "may"},
                {option_name: "june"},
                {option_name: "july"},
                {option_name: "august"},
                {option_name: "september"},
                {option_name: "october"},
                {option_name: "november"},
                {option_name: "december"},
            ]
          }
        ]
    };
    gopher.respondOk(response);

}
