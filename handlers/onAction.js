/**
 *
 * onAction Webhook – Fires when a user executes an email-based action.
 * See onFollowup.js for an example of how this magical button
 * can be created. It can be added to any email that Gopher sends
 * out.
 *
 * It can also be set as the "replyto" for an email that Gopher sends
 * out. This lets you send emails that simply ask for a reply. These
 * replies then come into this endpoint.
 *
 * Examples:
 * - One-click entry for a CRM without leaving email
 * - Mark a task as completed without leaving email
 * - Easily create a new task
 * -
 *
**/

'use strict';
const debug = require('debug')('gopher-cmd:hooks:onAction');
const _ = require('lodash');
const futUtils = require('./../lib/futUtils');
const config = require('../config');

module.exports.main = (event, context, callback) => {
	debug('onAction Webhook Received:', event);
	let fut = new futUtils(event, context, callback);
	if (!fut.webhookValidated)
		return fut.respondError('Webhook validation failed');

	// handy info we get with the webhook
	const privateData = _.get(fut.parsedBody, 'followup.extension.private_data');  // Data stored at the user-level. Same with every webhook. Ex, user account preferences, auth tokens, etc
	const followupData = _.get(fut.parsedBody, 'followup.extension.followup_data'); // Data stored against a particular reminder. Like a note, or a lookup key for a linked item in another system like a todo list or CRM

	let response = {};
	_.set(response, 'followup.send', true); // Andy: This triggers the followup email, correct?
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
	// TODO _.set(response, 'followup.replyto', );

	if (fut.isSimulation)
		return fut.respondOk(response);

	return fut.respondOk(response);
}