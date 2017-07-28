/**
 *
 * onFollowup Webhook
 * 
 * If your command creates a reminder, it receives this hook when 
 * the reminder triggers, just before it's sent. This lets you 
 * do useful / productive / awesome things to make this an  
 * extraordinary reminder. Reminders can be recurring, too.
 * 
 * Examples: 
 * - Send recurring updates to stay in touch with someone, pulling
     social media and contact info to include with the reminder. 
 * - Email a request for update. Funnel the reply text into 
 *   your project tracker.
 * - Get the weather in your inbox every day.
 * - Get the price of a product on a regular basis
 *
**/

'use strict';
const debug = require('debug')('fut-memorize:hooks:onFollowup');
const _ = require('lodash');
const moment = require('moment');
const config = require('../config');
const futUtils = require('./../lib/futUtils');

module.exports.main = (event, context, callback) => {
	// "event" comes straight from AWS Lambda unfiltered.
	debug('onFollowup: Webhook Request:', event);
	let fut = new futUtils(event, context, callback);

	// Commonly retrieved information
	const due = _.get(fut.parsedBody, 'followup.due');  // Due date of remiinder
	const created = _.get(fut.parsedBody, 'followup.created'); // When it was created
	const privateData = _.get(fut.parsedBody, 'followup.extension.private_data');  // Data stored at the user-level. Same with every webhook. Ex, user account preferences, auth tokens, etc
	const followupData = _.get(fut.parsedBody, 'followup.extension.followup_data'); // Data stored against a particular reminder. Like a note, or a lookup key for a linked item in another system like a todo list or CRM

	let response = {};
	_.set(response, 'followup.send', true); // To send the email follouwp or not (it sends by default).
	_.set(response, 'followup.due', Math.floor(moment().add(3, 'days').format('X')));  // Reset the due-date to reschedule the followup.
	_.set(response, 'followup.extension.followup_data.my_custom_key', 'My Custom Value');  // Store some more custom data with this reminder

	// Add data to the body of the email reminder. 
	let body = [
		{
			type: 'title', 
			text: 'A Surprisingly Useful Reminder'
		},
		{
			type: 'html',
			text: `
					<p>Pull the latest contact information, article, product pricing, server status 
					report, social media info. Include it all in your timely, useful reminder.
					<p><img src="https://media.giphy.com/media/Z3l1Oo5Ro9ZSw/giphy.gif"></p>
					`
		},
	    {
	    	type: 'section',
	    	title: 'TAGS',
	    	text: 'Tightly group labeled information together like this.'
	    },
	    {
	    	type: 'section',
	    	title: 'DESCRIPTION',
	    	text: 'A second descriptive item.'
	    },
	    {
	    	type: 'section',
	    	title: 'A MORE SPACED OUT SECTION',
	    },
	    {
	    	type: 'html',
	    	text: `Now ther there is some more space to render a larger bit of text. Even pull long-form content
	    	 into an email. If it arrives at the right time, great.`
	    },
	    {
	    	type: 'section',
	    	title: 'ADD SOME DATA'
	    },
	    {
		     type: 'button',
		     text: 'Link To Website',
		     url: 'https://www.google.com/'
	    },	    
	    {
		     type: 'button',
		     text: 'An Email-Based Action',
		     action: 'my.custom.action',
		     subject: "Fire off an API call by composing a new email",
		     body: `The 'action', 'taskid', 'action' and contents of this email are included in webhook request 
		     		to your actions endpoint.` // Possibilities > endless
	    },
	    {
	    	type: 'html',  // note: old-fashioned tables are a reliable way layout an HTML email.
	    	text: `<table border="0">
	    			<tr>
	    				<td>
			    			<p>The <strong>Email-Action</strong> button lets you get things done 
			    			without leaving your inbox. Look at how fast this interaction is on a native
			    			email client.</p>

			    			<p>Use this to streamline data entry, flag tasks as done, append to lists, 
				     		blog posts and more. All without leaving your email.</p>
			    			
			    			<p>The last section (postpone) comes by default on non-recurring reminders.</p>
			    		</td>
			    		<td>
			    			<img src="https://www.followupthen.com/assets/anim_email_actions.gif" width="200px" border="0px">
			    		</td>
			    	</tr>
			    	</table>
	    			`
	    },
	];

	_.set(response, 'followup.body', body);


	// The users of your extension can use it to send reminders to other people. When a reminder is scheduled 
	// for antoher person, the email-command is placed in the "cc" field so both parties can see it. Your extension
	// can also customize the body for your user's recipients. The same 
	let body_external = [
		{
			type: 'title', 
			text: 'Example reminder for 3rd party' // This text shows up a bit bigger
		},
		{
			type: 'section',
			title: `PROJECT`,
			text: "Acme, Inc"
		},
	    {
		     type: 'button',
		     text: 'Add Data',
		     action: 'external.custom.action',
		     subject: "Fire off an API call by composing a new email",
		     body: `The 'action', 'taskid', 'action' are included in webhook request 
		     		to your actions endpoint.`
	    }
	]

	_.set(response, 'followup.body_external', body_external);

	// TODO _.set(response, 'followup.replyto', );



	debug('onFollowup: Webhook Response: ',  response);

	if (fut.isSimulation) /// When you or a user is testing out this command with the emulator
		return fut.respondOk(response); 

	if (!fut.webhookValidated)
		return fut.respondError('Webhook validation failed');

	return fut.respondOk(response);
}