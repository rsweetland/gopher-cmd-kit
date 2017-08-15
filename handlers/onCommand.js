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

	let email;
	let postponeTimes;

	/**
	 * Salesforce Demo
	 */

	postponeTimes = ['1day', '2days','3days','5days','1weeks','2weeks','6weeks','3months','6months'];

	email = {body: []};

			email.body.push({
				type: 'html',
				text: `<br /><img src="http://fut-cdn.s3.amazonaws.com/gopher-demo-2017/sf.png" border="0" width="50px" style="float: right; padding: 10px;">
						<p>Followup reminder<br />
						<span style="font-size: 20px; line-height: 25px">Sally Mapleton</span><br />
						VP Engineering at Jones Corp</p>`
			});

			email.body.push({
				type: 'section',
				title: 'CONTACT INFORMATION'
			});
			
			email.body.push({
				type: 'button',
				text: 'email:smapleton@jonescorp.com',
				url: 'mailto:smapleton@jonescorp.com'
			});

			email.body.push({
				type: 'button',
				text: 'cell: 408-867-5309',
				url: 'tel:408-867-5309'
			});

			email.body.push({
				type: 'button',
				text: 'desk: 650-555-8857',
				url: 'tel:650-555-8857'
			});

			email.body.push({
				type: 'button',
				text: 'main: 650-555-1211',
				url: 'tel:650-555-1211'
			});

			email.body.push({
		    	type: 'html',
		    	text: '<div style="padding: 0px; margin: 0px; clear: both"></div>'
		    });

			email.body.push({
				type: 'section',
				title: 'SALESFORCE SHORTCUTS'
			});

			email.body.push({
				type: 'button',
				text: 'View Contact on Salesforce.com',
				url: 'salesforce.com'
			});

			email.body.push({
				type: 'button',
				text: 'Complete this activity',
				action: 'complete',
				subject: "Hit send to complete this activity",
			});

			email.body.push({
				type: 'button',
				text: 'Log a Call',
				action: 'log_a_call',
				subject: "Add notes below, then hit 'send'",
				body: ''
			});

			email.body.push({
				type: 'button',
				text: 'Add notes',
				action: 'add_notes',
				subject: "Add notes below, then hit 'send'",
				body: ''
			});

			email.body.push({
		    	type: 'html',
		    	text: '<div style="padding: 0px; margin: 0px; clear: both"></div>'
		    });

			email.body.push({
				type: 'section',
				title: 'LATEST SALESFORCE ACTIVITY',
				description: ''
			});

			email.body.push({
					type: 'html',
					text: `<p><em>Mon, Jan 23, 2018</em><br />
					<em>John Smith</em><br />
	                Sent followup email. </strong> Discount offered to move ahead before the end of the quarter.</p>`
				});

			email.body.push({
					type: 'html',
					text: `<p><em>Thurs, Jan 19, 2018</em><br /><em>John Smith</em><br >
	                Proposal sent. </strong> Quoted 3000 units. Special approval on pricing received from Tom in finance. Coordinate with Tom on future deals with this customer.</p>`
				});

			email.body.push({
					type: 'html',
					text: `<p><em>Thurs, Jan 19, 2018</em><br /><em>Sally Jones</em><br >
	                Special pricing approved.`
				});

			email.body.push({
					type: 'html',
					text: `<p><em>Monday, Jan 16, 2018</em><br /><em>John Smith</em><br >
	                Customer intersted in moving ahead. Needs 3000 units for use in upcoming event.</p>`
				});

			email.body.push({
		    	type: 'html',
		    	text: '<div style="padding: 0px; margin: 0px; clear: both"></div>'
		    });
		    
			email.body.push({
				type: 'section',
				title: 'SCHEDULE NEW FOLLOWUP'
			});

			// postponeTimes = _.get(gopher.user, 'postponeTimes', []);
				for (var i=0; i< postponeTimes.length; i++) {

					email.body.push({
						type: 'button',
						text: postponeTimes[i],
						action: `postpone.${postponeTimes[i]}`,
						subject: `Schedule a followup for ${postponeTimes[i]} (Add notes below)`,
						body: '',
					})
				}


			email.body.push({
		    	type: 'html',
		    	text: '<div style="padding: 0px; margin: 0px; clear: both"></div>'
		    });


	gopher.sendEmail(email);
	return gopher.respondOk();

/**
 * 
 * ProductHunt Demo
 * 
 */

let products = [
	{
		title: 'Pexels 2.0',
		subhead: 'The best free stock photos in one place',
		img: 'http://fut-cdn.s3.amazonaws.com/gopher-demo-2017/pexels.jpeg',
		votes: 6307,
		comments: 212
	},
	{
		title: 'AutoDraw',
		subhead: 'Autocorrect for drawing, by Google',
		img: 'http://fut-cdn.s3.amazonaws.com/gopher-demo-2017/autodraw.gif',
		votes: 7122,
		comments: 321
	},
	{
		title: 'Slack',
		subhead: 'Be less busy. Real-time messaging, archiving & search.',
		img: 'http://fut-cdn.s3.amazonaws.com/gopher-demo-2017/slack.jpeg',
		votes: 6252,
		comments: 401
	}
]

	email = {
		subject: 'Product Hunt Today',
		body: [
		    {
		    	type: 'html',
		    	text: `<div style="padding: 0px; margin: 0px; clear: both">
		    			<br />
		    			<h1><img src="http://fut-cdn.s3.amazonaws.com/gopher-demo-2017/ph.png" height="30px" align="absmiddle" /> Product Hunt Today </h1>
		    			</div>`
		    },
		]
	};

	_.each(products, (product) => {

		email.body.push(
			{
		    	type: 'html',
		    	text: `<table border="0" width="100%" style="float: left; margin-top: 10px">
		    			<tr>
				    		<td valign="top" width="75px">
				    			 <img width="75px" src="${product.img}">
				    		</td>
		    				<td valign="top">
				    			<p><strong>${product.title}</strong><br />
				    			${product.subhead}<br />
				    			votes: <strong>${product.votes}</strong><br />
				    			comments: <strong>${product.comments}</strong>
				    		</p>
				    		</td>
				    	</tr>
				    	</table>
		    			`
		    },
		    {
			     type: 'button',
			     text: 'upvote',
			     action: 'upvote.332432',
			     subject: "Hit send to upvote on Product Hunt",
			     body: ``
		    },
		    {
			     type: 'button',
			     text: 'comment',
			     action: 'comment.332432',
			     subject: "Hit send to leave your comment on Product Hunt",
			     body: ``
		    }, 
		    {
			     type: 'button',
			     text: 'view',
			     url: `https://www.producthunt.com`
		    },
		    {
			     type: 'button',
			     text: 'save:tech',
			     url: `https://www.producthunt.com`
		    },
		    {
			     type: 'button',
			     text: 'save:productivity',
			     url: `https://www.producthunt.com`
		    }, 
		    {
			     type: 'button',
			     text: 'save:books',
			     url: `https://www.producthunt.com`
		    },
		    {
		    	type: 'html',
		    	text: `	    			<div style="padding: 0px; margin: 0px; clear: both"></div>`
		    })
	})


	// email.body.push(
	// 		{
	// 			type: 'section',
	// 			title: 'CHANGE SUBSCRIPTION'
	// 		},
	// 	    {
	// 		     type: 'button',
	// 		     text: 'daily',
	// 		     action: 'assign.self',
	// 		     subject: "Hit send to assign this issue to yourself",
	// 		     body: ``
	// 	    },
	// 	    {
	// 		     type: 'button',
	// 		     text: 'weekly',
	// 		     action: 'assign.self',
	// 		     subject: "Hit send to assign this issue to yourself",
	// 		     body: ``
	// 	    },
	// 	    {
	// 		     type: 'button',
	// 		     text: 'monthly',
	// 		     action: 'assign.self',
	// 		     subject: "Hit send to assign this issue to yourself",
	// 		     body: ``
	// 	    },
	// 	    {
	// 	    	type: 'html',
	// 	    	text: '<div style="padding: 0px; margin: 0px; clear: both"></div>'
	// 	    });

	gopher.sendEmail(email);

	return gopher.respondOk();




/**
 * 
 * Github Demo
 * 
 */

	gopher.sendEmail({
		subject: 'Re: [rsweetland/gopher-cmd-kit] Parse recipient string',
		body: [
		    {
		    	type: 'html',
		    	text: '<div style="padding: 0px; margin: 0px; clear: both"></div>'
		    },
			{
				type: 'section',
				title: 'GITHUB ISSUE',
			},
			{
				type: 'title',
				text: 'Parse recipient string #112'
			},
			{
				type: 'html',
				text: `How about parsing the recipient string and sending in the webhook?`
			},
		    {
		    	type: 'section',
		    	title: 'ADD LABELS',
		    },
		    {
			     type: 'button',
			     text: 'feature',
			     action: 'label.feature',
			     subject: "Hit send to add 'feature' label ",
			     body: ``
		    },
		    {
			     type: 'button',
			     text: 'docs',
			     action: 'label.wishlist',
			     subject: "Hit send to add 'feature' label ",
			     body: ``
		    },
		    {
			     type: 'button',
			     text: 'bug',
			     action: 'label.bug',
			     subject: "Hit send to add 'feature' label ",
			     body: ``
		    },
		    {
		    	type: 'html',
		    	text: '<div style="padding: 0px; margin: 0px; clear: both"></div>'
		    },
		    {
		    	type: 'section',
		    	title: 'ASSIGN',
		    },
		    {
			     type: 'button',
			     text: 'andylibrian',
			     action: 'assign.andylibrian',
			     subject: "Hit send to assign this issue to andylibrian ",
			     body: ``
		    },
		    {
			     type: 'button',
			     text: 'myself',
			     action: 'assign.self',
			     subject: "Hit send to assign this issue to yourself",
			     body: ``
		    },
		    {
		    	type: 'html',
		    	text: '<div style="padding: 0px; margin: 0px; clear: both"></div>'
		    },
		    {
		    	type: 'section',
		    	title: 'ACTIONS',
		    },
		    {
			     type: 'button',
			     text: 'Comment',
			     action: 'comment',
			     subject: "Hit send to add your comment",
			     body: ``
		    },
		    {
			     type: 'button',
			     text: 'Close Ticket',
			     action: 'close',
			     subject: "Hit send to close this ticket",
			     body: ``
		    },
		    {
		    	type: 'html',
		    	text: '<div style="padding: 0px; margin: 0px; clear: both"></div>'
		    },
		    {
		    	type: 'section',
		    	title: 'FOLLOW UP',
		    },
		    {
			     type: 'button',
			     text: '1day',
			     action: 'followup.1day',
			     subject: "Hit send to schedule a followup for 1 day",
			     body: ``
		    },
		    {
			     type: 'button',
			     text: '3days',
			     action: 'assign.self',
			     subject: "Hit send to assign this issue to yourself",
			     body: ``
		    },
		    {
			     type: 'button',
			     text: '1week',
			     action: 'assign.self',
			     subject: "Hit send to assign this issue to yourself",
			     body: ``
		    },
		    {
			     type: 'button',
			     text: '2weeks',
			     action: 'assign.self',
			     subject: "Hit send to assign this issue to yourself",
			     body: ``
		    },		    
		    {
			     type: 'button',
			     text: '3weeks',
			     action: 'assign.self',
			     subject: "Hit send to assign this issue to yourself",
			     body: ``
		    },
		    {
			     type: 'button',
			     text: '1month',
			     action: 'assign.self',
			     subject: "Hit send to assign this issue to yourself",
			     body: ``
		    },	    
		    {
			     type: 'button',
			     text: '2months',
			     action: 'assign.self',
			     subject: "Hit send to assign this issue to yourself",
			     body: ``
		    },
		    {
			     type: 'button',
			     text: '6months',
			     action: 'assign.self',
			     subject: "Hit send to assign this issue to yourself",
			     body: ``
		    },
		    {
			     type: 'button',
			     text: '1year',
			     action: 'assign.self',
			     subject: "Hit send to assign this issue to yourself",
			     body: ``
		    },
		    {
		    	type: 'html',
		    	text: '<div style="padding: 0px; margin: 0px; clear: both"></div>'
		    },
		]
	});

	return gopher.respondOk();








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
