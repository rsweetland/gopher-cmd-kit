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

// process.env.TESTING = true;

module.exports.main = (event, context, callback) => {
	if (process.env.TESTING) {
		event = require('../test/mock.js').onActionEvent;
	}

	debug('onAction Webhook Received:', event);
	let gopher = new GopherHelper(event, context, callback, config.fut);

	if (!gopher.webhookValidated)
		return gopher.respondError('Webhook validation failed');

	var email = {
		subject: '',
		body: []
	};

	switch (gopher.action) {

		case 'salesforce':
			email.subject = 'Gopher Salesforce Demo';

			let postponeTimes = ['1day', '2days','3days','5days','1weeks','2weeks','6weeks','3months','6months'];

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
			break;
		case 'producthunt':
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

			email.subject = 'Gopher Producthunt Demo';
			email.body = [
				{
					type: 'html',
					text: `<div style="padding: 0px; margin: 0px; clear: both">
							<br />
							<h1><img src="http://fut-cdn.s3.amazonaws.com/gopher-demo-2017/ph.png" height="30px" align="absmiddle" /> Product Hunt Today </h1>
							</div>`
				},
			];

			_.each(products, (product) => {

				email.body.push({
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
			});
			
			gopher.sendEmail(email);
			break;
		case 'github':
			gopher.sendEmail({
				subject: 'Gopher Github Demo',
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
			break;
		default:
			break;
	}

	gopher.respondOk();
}