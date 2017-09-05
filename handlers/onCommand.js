/**
 *
 * onCommand Webhook – Fires every time Gopher creates a new new followup reminder
 *
 * When Gopher receives a gopher command by email (ex command.param.param@gopher.email)
 * this hook is fired.
 * is fired. Use it to synchronize due-dates, creating calendar events,
 * CRMs or project management systems.
 *
 * Examples:
 * - Add a contact to a CRM. Reply right away with
     social media and contact info to include with the reminder.
 * - Reply with a confirmation that some action has been done.
 *
**/

'use strict';
const debug = require('debug')('gopher-cmd:hooks:onCommand');
const _ = require('lodash');
const config = require('../config');
const GopherHelper = require('gopher-helper');

module.exports.main = (event, context, callback) => {

	debug('onCommand: Webhook Received:', event);
	let gopher = new GopherHelper(event, context, callback, config.fut);
	if (!gopher.webhookValidated)
		return gopher.respondError('Webhook validation failed');

	var response = {};

  	// Get validated gopherClient from stored auth token
	const futAccessToken = _.get(gopher.userData, 'fut_access_token') || _.get(gopher, "parsedBody.extension.shared_data['Gopher Chrome'].fut_access_token"); //TODO: Create Gopher Helper to store this.
	if (!futAccessToken) {

		return gopher.respondError(`Gopher had trouble connecting to the reminder service. 
			Please visit this URL to reconnect: ${config.baseUrl}`);

	} else {
		gopher.getClient(futAccessToken);
	}

  	// Get Command Params
	let commandOptions = gopher.commandOptions;
	let recipientOption = commandOptions[0];  //ex remind.{recipientOption}.3days
	let timeStringOption = commandOptions[1]; //ex remind.recipient.{timeStringOption}
	let commandName = gopher.commandName;

    // If no params given, use defaults
    if(!recipientOption && !timeStringOption) {
        let fallbackCommand = _.get(gopher.userData, 'default_command', 'remind.me.3days');
        gopher.setCommand(fallbackCommand);
        recipientOption = gopher.commandOptions[0];
        timeStringOption = gopher.commandOptions[1];
        var fallbackUsed = true;
    }

	// Schedule a followup
	if (recipientOption === 'everyone') {
		debug('shared reminder scheduled: ', `${gopher.source.to}, ${gopher.source.cc}`);
		debug('creating followup');
		gopher.createFollowup(timeStringOption, `${gopher.source.to}, ${gopher.source.cc}`)
		.then(respondSuccess)
		.catch(handleError);

	} else {
		debug('creating followup');
		gopher.createFollowup(timeStringOption)
		.then(respondSuccess)
		.catch(handleError);
	}

	function respondSuccess(followupApiResponse) {
		debug('responding successfully');

		if(!_.get(gopher.userData, 'confirmations_off')) {
			let followupAudience = recipientOption === 'everyone' ? `${gopher.source.to}, ${gopher.source.cc}` : 'only you';
				if(fallbackUsed)
					var fallbackUsedMessage = `Because you didn't specify a date, we used ${fallbackCommand}. You can change this on your extension's settings page.`;

				response.followup = {
						subject: `Gopher followup scheduled for ${followupApiResponse.followup.due_friendly}`,
						body: [
						{
							type: "title",
							text: "Your Gopher reminder has been scheduled"
						},
						{
							type: "html",
							text: `Gopher will followup with ${followupAudience} on ${followupApiResponse.followup.due_friendly}. ${fallbackUsedMessage}`
						},
						{
						     type: 'button',  //see section on email-based actions
						     text: 'Web: Turn off these Confirmations',
						     url: config.baseUrl
					    },
						{
						     type: 'button',  //see section on email-based actions
						     text: 'Action Email: Turn off these Confirmations',
						     action: 'notifications.off',
						     subject: "Hit Send to Turn off Confirmation Emails",
						     body: "This is a Gopher email-action, a handy way of getting stuff done without ever leaving your inbox.",
					    },
					    {
					    	type: 'html',
					    	text: '<table width="100%" border="0"><tr><td></td></tr></table>',
					    }
						]
					};
			
			return callback(null, {
					statusCode: 200, 
					body: JSON.stringify(response)
				});

		} else {
			// silence...
			debug('reminder created');
			return gopher.respondOk();
		}
	}

	function handleError(err) {
		debug('Error creating the reminder: ', err);
		return gopher.respondError({message: `Sorry, there was an error creating your followup: ${err}`});
	}
}
