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
const debug = require('debug')('gopher-cmd:hooks:onFollowup');
const _ = require('lodash');
const moment = require('moment');
const config = require('../config');
const GopherHelper = require('gopher-helper');
const logger = require('../lib/logger');

module.exports.main = (event, context, callback) => {
	debug('onFollowup: Webhook Request:', event);
	logger.log('remind: onFollowup event received');
	let gopher = new GopherHelper(event, context, callback, config.fut);
	if (!gopher.webhookValidated) {
		logger.log('remind: onFollowup failed webhook validation', {level: 'error', meta: {event: event}});
		return gopher.respondError(`Gopher had trouble connecting with the reminder system and cannot pull 
			your postpone and custom followup content at this time. We've been alerted the error. In meantime, 
			here is the original email that was scheduled for right now.`);
	}
let email;
let postponeTimes;
/**
 * Salesforce Demo
 * 
 */

postponeTimes = ['1day', '2days','3days','5days','1weeks','2weeks','6weeks','3months','6months'];

email = {body: []};

		email.body.push({
			type: 'html',
			text: `<img src="http://fut-cdn.s3.amazonaws.com/gopher-demo-2017/sf.png" border="0" width="50px" style="float: right; padding: 10px;">
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
			text: 'cell: 408-867-5309',
			url: 'tel:408-867-5309'
		});

		email.body.push({
			type: 'button',
			text: 'desk: 650-555-1212',
			url: 'tel:408-867-5309'
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
			subject: "Enter subject here",
			body: ''
		});

		email.body.push({
			type: 'button',
			text: 'Add notes',
			action: 'add_notes',
			subject: 'Enter subject here',
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

		postponeTimes = _.get(gopher.user, 'postponeTimes', []);
			for (var i=0; i< postponeTimes.length; i++) {

				email.body.push({
					type: 'button',
					text: postponeTimes[i],
					action: `postpone.${postponeTimes[i]}`,
					subject: `Hit send to postpone`,
					body: '',
				})
			}


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
 * Github 
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
			     action: 'assign.andylibrian',
			     subject: "Hit send to assign this issue to andylibrian ",
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
			     text: '1month',
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




	// let response = {
	// 	followup: {
	// 		body: [
	// 			{
	// 				type: 'section',
	// 				title: 'POSTPONE'
	// 			},
	// 		]
	// 	}
	// }

	// var postponeTimes = _.get(gopher.user, 'postponeTimes', []);
	// for(var i=0; i< postponeTimes.length; i++) {

	// 	response.followup.body.push({
	// 		type: 'button',
	// 		text: postponeTimes[i],
	// 		action: `postpone.${postponeTimes[i]}`,
	// 		subject: `Hit send to postpone`,
	// 		body: '',
	// 	})
	// }

	// response.followup.body.push({
	// 	    		type: 'html',
	// 	    		text: '<table width="100%" border="0"><tr><td>&nbsp;</td></tr></table>'
	// 	    	});

	logger.log('remind: onFollowup response', {meta: { response: JSON.stringify(response)}});
	return gopher.respondOk(response);
}