/**
 *
 * onCreate Webhook – Fires when Gopher creates a new new followup reminder
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
const debug = require('debug')('gopher-cmd:hooks:onCreate');
const _ = require('lodash');
const config = require('../config');
const futUtils = require('./../lib/futUtils');

module.exports.main = (event, context, callback) => {
	debug('onCreate: Webhook Received:', event);
	let fut = new futUtils(event, context, callback);

	if (!fut.webhookValidated)
		return fut.respondError('Webhoook failed to validate');

	let response = {};
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
		     		to your actions endpoint.` // Possibilities, endless. See onAction
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


	if (fut.isSimulation)
		return fut.respondOk(response);

	return fut.respondOk(response);
}