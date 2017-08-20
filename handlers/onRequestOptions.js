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
const logger = require('../lib/logger');
const GopherHelper = require('gopher-helper');
const Mixpanel = require('mixpanel');
const mixpanel = Mixpanel.init(config.mixpanel);

module.exports.main = (event, context, callback) => {
    debug('onRequestOptions: Webhook Received:', event);
    logger.log('remind: requestOptions hook received');
    let gopher = new GopherHelper(event, context, callback, config.fut);
    mixpanel.track('command options requested', {
        command: 'remind',
        distinct_id: _.get(gopher, 'user.email'),
        usercommand: _.get(gopher, 'fullCommand')
    });

    if (!gopher.webhookValidated)
        return gopher.respondError('Webhook validation failed');

    if(process.env.TESTING) {
        debug('Mocked Events....');
        var mock = require('../test/mock');
        event = mock.onRequestOptions;
    }

    var response = {
        "command_url": config.baseUrl, //todo: should be only one
        "params": []
    };
    logger.log('remind: requestOptions response', {meta: {response: JSON.stringify(response)}});
    gopher.respondOk(response);

}
