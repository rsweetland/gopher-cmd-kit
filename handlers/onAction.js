/**
 *
 * onAction Webhook – Fires when a user executes an email-based action.
 * See onFollowup.js and onCommand.js for an example of how this magical button
 * can be created. An email-action can be added to any email that Gopher sends.
 *
 * It can also be set as the "replyto" for emails that Gopher sends.
 * This lets you send emails that simply ask for a reply, or that
 * have a dialog with the user. All of that arrives here.
 *
 * Examples:
 * - One-click entry for a CRM without leaving email
 * - Mark a task as completed without leaving email
 * - Easily create a new task
 *
**/

'use strict';
const debug = require('debug')('gopher-cmd:hooks:onAction');
const _ = require('lodash');
const GopherHelper = require('gopher-helper');
const config = require('../config');
const Mixpanel = require('mixpanel');
const mixpanel = Mixpanel.init(config.mixpanel);
const logger = require('../lib/logger');

module.exports.main = (event, context, callback) => {

	if(process.env.TESTING) {
        debug('...Mocked Events....');
        var mock = require('../test/mock');
        event = mock.onAction;
    }

	debug('onAction Webhook Received:', event);
	let gopher = new GopherHelper(event, context, callback, config.fut);

	if (!gopher.webhookValidated)
		return gopher.respondError('Webhook validation failed');

	switch(gopher.action) {

		case 'notifications':

			if(gopher.actionParams[0] === 'check') {
				debug('checking confirmations');
				let confirmations = _.get(gopher.userData, 'confirmations_off') ? 'Off' : 'On';
				gopher.setEmailReplyTo('help+gopher@humans.fut.io');
				gopher.sendEmail({
						body: [
						{
							type: 'title',
							text: `Confirmations: ${confirmations}`
						},
						{
							type: 'button',
							url: config.baseUrl,
							text: 'Update Your Settings'
						},
						{
							type: 'html',
							text: '<table border="0" width="100%"><tr><td></td></tr></table>'
						} 
						]
					});
				logger.log('remind: checking confirmation action email', {meta: {response: gopher.response}});
				return gopher.respondOk();
			}

			gopher.setUserData({confirmations_off: 1});
			gopher.setEmailReplyTo({action: 'notifications.check'});
			gopher.sendEmail({
				subject: "Confirmations have been turned off",
				body: [
					{
						"type": "title",
						"text": "Confirmations have been turned off."
					}
				]
			});

		    mixpanel.track('used action email to turn off notifications', {
		        command: 'remind',
		        distinct_id: _.get(gopher, 'user.email'),
		        usercommand: _.get(gopher, 'fullCommand')
		    });

		    logger.log('remind: action email checking notifications', {meta: {response: gopher.response}});

			return gopher.respondOk();


		break;

		case 'postpone':
			debug('In Postpone. Params are: ', gopher.actionParams);

			if(_.isEmpty(followupid) || _.isEmpty(newDate)) {
				return gopher.respondError("Sorry, for some reason your followup information didn't come through. Please try again or contact support.");
			}

			if(_.get(gopher.userData, 'fut_access_token')) {
				var followupClient = gopher.getClient(_.get(gopher.userData, 'fut_access_token'));
			} else {
				return gopher.respondOk({  soft_errors: [ { message: "Your Gopher login information was incorrect or could not be located. Please login"}]});
			}

			followupClient.updateFut(followupid, {reschedule: 1, fut_format: newDate})
			.then((res) => {
				debug('Successfully Rescheudled', res);
				return gopher.respondOk(res);
			})
			.catch((err) => {
				debug('Error Rescheduling: ', err);
				return gopher.respondError(err);
			});
		break;

		default:
			logger.log('unknown action email received', {level: 'warn', meta: {event: event}});
			debug(gopher.source.from);
			return gopher.respondOk({
				followup: {
					subject: "Action Email Error", // Best practice: Always put original subject in the action error email so the user find it.
					body: [
						{
							type: 'title',
							text: "Sorry, we couldn't understand that action"
						},
						{
							type: 'html',
							text:
							`
							<p>It looks like you sent an action that we didn't recognize.</p>
							<p>If this action was related to a followup, the subject will be provided here: </p>

							<p> ${gopher.source.subject} </p>

							<p>Would you hitting reply and letting us know about the error?</p>
							<p>We're adding some additional information to help track down the issue:</p>
							<p>----<br />
							Action: ${gopher.fullAction}<br />
							From: ${gopher.source.from}<br />
							Followup Id: ${gopher.followup.id}<br />
							</p>

							<p> - Team Gopher </p>

							`
						}
					]
				},
				replyto: 'help+gopher@humans.fut.io'
			});
		break;
	}

}