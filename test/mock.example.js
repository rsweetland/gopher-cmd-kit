// var nock = require('nock');

// nock('http://staging1.www.gopher.email:80', {"encodedQueryParams":true})
//     .post('/api/v2/reminders/', "timezone=America%2FLos_Angeles&source%5Bfrom%5D=esweetland%40gmail.com&source%5Bsubject%5D=Capture%20requests&source%5Bbody%5D=%3Cdiv%20dir%3D%22ltr%22%3E%3Cbr%3E%3C%2Fdiv%3E%0A&source%5Btype%5D=api&source%5Brecipient_server%5D=1sec-remind%2Bme%2B1sec%40gopher.email")
//     .reply(201, {"status":"success","type":"reminder_created","extension":[{"flag":"remind","webhook_response":[]}],"followup":{"valid":true,"created":1501872707,"timezone":"America/Los_Angeles","created_friendly":"Fri, August 4th 2017 11:51am PDT","due":1501872708,"due_friendly":"Fri, August 4th 2017 11:51am PDT","format":"1sec-remind+me+1sec","completed":false,"completed_on":"","completed_on_friendly":"","tags":["me","1sec"],"suffix_flags":["remind"],"extensions":{"sms":false,"task":false,"recurring":false,"response_detection":false},"user_date_format":"12h","followup_id":1535,"source":{"type":"email","subject":"Capture requests","body":"<div dir=\"ltr\"><br /></div><br />","body_text":"    ","from":"esweetland@gmail.com","external_recipients":[],"related_contacts":[],"email_method":"to"}}}, [ 'Cache-Control',
//     'no-cache',
//     'Content-Type',
//     'application/json',
//     'Date',
//     'Fri, 04 Aug 2017 18:51:46 GMT',
//     'Server',
//     'Apache',
//     'Content-Length',
//     '839',
//     'Connection',
//     'Close' ]);


module.exports.onCommand = {};    

module.exports.onValidateCommandFormat = {};

module.exports.onRequestOptions = {};

 module.exports.onAction = {};