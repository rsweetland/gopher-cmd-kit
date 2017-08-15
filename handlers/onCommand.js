/**
 *
 * onCommand Webhook – Fires on every Gopher Command (ex: command.param.param@gopher.email)
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
const logger = require('../lib/logger');
const GopherHelper = require('gopher-helper');
const Mixpanel = require('mixpanel');
const mixpanel = Mixpanel.init(config.mixpanel);

module.exports.main = (event, context, callback) => {
	
	/**
	 * When you're creating your command, you can log the 'event' object
	 * then copy / paste it here or use other tools to mock it. This lets you 
	 * replay that webhook again and again while testing. Set process.env.TESTING=true
	 * while doing this to bypass webhook's time signature check.
	 */	
	
	// process.env.TESTING // setting this to true removes time verification from webhook validator	
	// debug('onCommand: Webhook Received:', event);
	// event = {}; // mock (overwrite) your event object while testing
	
	let gopher = new GopherHelper(event, context, callback, config.fut); //magic helpers
	
	if (!gopher.webhookValidated){
		debug('webhook validation failed');
		return gopher.respondError('Gopher is having connection troubles');
	}


  	/**
  	 *  
  	 *  Example 1: Send a simple email response when you get your command.
  	 *  
  	 */

	gopher.sendEmail({
		subject: 'Welcome to Gopher!',
		body: [
			{
				type: 'title',
				text: 'A Surprisingly Useful Email'
			},
			{
				type: 'html',
				text: `
						<p>Get everythign you need in your inbox, right when you need it.
						Either at the time your command is run, or right at the moment 
						it is scheduled. Contact information, article, product pricing, server status
						reports, social media info and more. Include it all in your timely, 
						useful reminder. You'll be like this guy:
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
		    	title: 'ANOTHER SECTION',
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
		    
		    /**
		     * This is how you create a magic "Action Email" ✨. One that turns email into an 
		     * http request. See handlers/onAction.js for more information about this.
		     */

		    {
			     type: 'button',
			     text: 'An Email-Based Action',
			     action: 'my.custom.action',
			     subject: "Fire off an API call by composing a new email",
			     body: `The 'action', 'taskid', 'action' and contents of this email are included in webhook request
			     		to your actions endpoint.`
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
		]
	});

	return gopher.respondOk();



  	/**
  	 *  Example 2: Createa a Followup reminder. ⏲  (This is basically Gopher's "remind" command).
  	 *  It shows Gopher's reminders API, using command options and setting user data.
  	 *
  	 *  NOTE: Access tokens don't arrive when you test the webhook from the web UI. This 
  	 *  example must be done over email (or with the event copied / mocked as described above)
  	 */

	var response = {};

	const futAccessToken = _.get(gopher.userData, 'fut_access_token'); // access token not present when using web UI
	if (!futAccessToken) {
		return gopher.respondError(`Gopher had trouble connecting to the reminder service. 
			Please visit this URL to reconnect: ${config.baseUrl}`);

	} else {
		gopher.getClient(futAccessToken); // gopherClient is now authenteicated
	}

	/**
	 * Parse out the command options. Ex: remind.me.3days 
	 */
	
	let commandOptions = gopher.commandOptions;
	let recipientOption = commandOptions[0];  //ex remind.{recipientOption}.3days
	let timeStringOption = commandOptions[1]; //ex remind.recipient.{timeStringOption}
	let commandName = gopher.commandName;
	
	if (recipientOption === 'me') {

		/**
		 * ⏲ Setting reminders is easy! 
		 * But this is more than a reminder. It's a Future Gother Moment™. In 3days (for example), your 
		 * handlers/onFollowup.js hook will fire, allowing you to insert amazingly useful content in your 
		 * followup email. TPS report reminders, weather reports, project updates and more. Note that the
		 * date format can be recurring.
		 */
		
		gopher.createFollowup(timeStringOption)
		.then(respondSuccess)
		.catch(handleError);

	} else {


		debug('shared reminder scheduled: ', `${gopher.source.to}, ${gopher.source.cc}`);

		/**
		 * Add recipients with the second arguments. See GopherHelpers.js for details.
		 */
		
		gopher.createFollowup(timeStringOption, `${gopher.source.to}, ${gopher.source.cc}`)
		.then(respondSuccess)
		.catch(handleError);

	}

	function respondSuccess(followupApiResponse) {

		/**
		 *  User settings are set via the front-end, or via webhook response as shown in the example in onAction. 
		 *  These arrive with each webhook so your handler can remain stateless. Here's one way you can use this.
		 */

		if(!_.get(gopher.userData, 'confirmations_off')) {

			let followupAudience = recipientOption === 'everyone' ? `${gopher.source.to}, ${gopher.source.cc}` : 'only you';

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
						     type: 'button',  //a normal button
						     text: 'Web: Turn off these Confirmations',
						     url: config.baseUrl
					    },
						{
						     type: 'button',  // Email-based action.
						     text: 'Action Email: Turn off these Confirmations',
						     action: 'notifications.off',
						     subject: "Hit Send to Turn off Confirmation Emails",
						     body: "This is a Gopher email-action, a handy way of getting stuff done without ever leaving your inbox.",
					    },
					    {
					    	type: 'html',
					    	text: '<table width="100%" border="0"><tr><td></td></tr></table>', //shouldn't be needed soon
					    }
						]
					};
			
			return callback(null, {
					statusCode: 200, 
					body: JSON.stringify(response)
				});

		} else {
			// silence...
			return gopher.respondOk();

			/**
			 * Note: The GopherHelper keeps a simple JSON object for the response internally. When 
			 * the respondOk() method is called, it sends this JSON back to Gopher. View this respnose object
			 * any time with debug(gopher.response);
			 */
		}
	}

	function handleError(err) {
		debug('Error creating the reminder: ', err);
		return gopher.respondError({message: `Sorry, there was an error creating your followup: ${err}`});
	}
}
