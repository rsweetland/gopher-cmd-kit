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
const futUtils = require('./../lib/futUtils');

module.exports.main = (event, context, callback) => {
	debug('onCommand: Webhook Received:', event);
	let fut = new futUtils(event, context, callback);

	if (!fut.webhookValidated)
		return fut.respondError('Webhoook failed to validate');

	// handy info we get with the webhook
  // Data stored at the user-level. Same with every webhook. Ex, user account preferences, auth tokens, etc
	const futAccessToken = _.get(fut.parsedBody, 'extension.private_data.fut_access_token', '');
	const requestSource = _.get(fut.parsedBody, 'followup.source', {});

  if (!futAccessToken) {
  }

  const futClient = fut.getClient(futAccessToken);

  // ex: ['remind.me.1hour', 'gopher.email']
  const recipientSplit = _.get(requestSource, 'recipient', '').split('@');

  // ex: ['remind', 'me', '1hour']
  const commandSplit = recipientSplit[0].split('.');

  // ex: '1hour'
  const futFormat = commandSplit[commandSplit.length - 1];

  const params = {
    source: {
      recipient_server: futFormat + '@' + recipientSplit[1], // ex: 1hour@gopher.email
      recipients_to: _.get(requestSource, 'headers.to', ''),
      from: _.get(requestSource, 'from', ''),
      body: _.get(requestSource, 'body', ''),
      type: 'api',
      subject: _.get(requestSource, 'subject', ''),
    }
  };

  if (_.has(requestSource, 'headers.cc')) {
    params.source['recipients_cc'] = _.get(requestSource, 'headers.cc', '');
  }

  if (_.has(requestSource, 'headers.bcc')) {
    params.source['recipients_bcc'] = _.get(requestSource, 'headers.bcc', '');
  }

  debug('futReminderAPIParams', params);

  futClient.createFut(params)
  .then((res) => debug('Followup Created API Response: ', res))
  .catch((err) => debug('Followup API Error: ', err));

	let response = {};

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

	return fut.respondOk({});
}
