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


module.exports.onCommand = { headers:
   { Host: 'introcmd.ngrok.io',
     'X-FUT-Timestamp': '1503469704',
     'X-FUT-Signature': '27f371050bce7248ddcd399567cfba59d9bd9f474010f0a28cedc5f52853a454',
     'Content-Type': 'application/json',
     'User-Agent': 'Guzzle/3.9.3 curl/7.47.1 PHP/5.6.26',
     'Content-Length': 4324,
     'X-Forwarded-For': '52.91.161.174' },
  path: '/onCommand',
  pathParameters: null,
  requestContext:
   { accountId: 'offlineContext_accountId',
     resourceId: 'offlineContext_resourceId',
     apiId: 'offlineContext_apiId',
     stage: 'dev',
     requestId: 'offlineContext_requestId_',
     identity:
      { cognitoIdentityPoolId: 'offlineContext_cognitoIdentityPoolId',
        accountId: 'offlineContext_accountId',
        cognitoIdentityId: 'offlineContext_cognitoIdentityId',
        caller: 'offlineContext_caller',
        apiKey: 'offlineContext_apiKey',
        sourceIp: '127.0.0.1',
        cognitoAuthenticationType: 'offlineContext_cognitoAuthenticationType',
        cognitoAuthenticationProvider: 'offlineContext_cognitoAuthenticationProvider',
        userArn: 'offlineContext_userArn',
        userAgent: 'Guzzle/3.9.3 curl/7.47.1 PHP/5.6.26',
        user: 'offlineContext_user' },
     authorizer: { principalId: 'offlineContext_authorizer_principalId' },
     resourcePath: '/onCommand',
     httpMethod: 'POST' },
  resource: '/onCommand',
  httpMethod: 'POST',
  queryStringParameters: null,
  stageVariables: null,
  body: '{"webhook":{"name":"onCommand","timestamp":1503469704},"extension":{"private_data":{"fut_access_token":"990504da2835be717e0b21ece8a9762bfcfabb75"},"shared_data":[]},"user":{"email":"jorenm@gmail.com","name":"Joren Mathews","timezone":"America/Los_Angeles","preferred_date_format":"D, F jS Y g:ia T","confirmations":false,"postponeTimes":["2h","4h","8h","1d","3d","1w","2w","1mo","3mo","6mo","1y"],"defaultDailyReminderTime":6,"disableMailtoLinks":true},"params":[],"flag":"intro","command":"intro","followup":{"source":{"recipient":"intro@gopher.email","subject":"aaa","body":"<div dir=\\"ltr\\">bbb</div>\\n","body_text":"bbb\\n","from":"jorenm@gmail.com","external_recipients":["<joren@300feetout.com>"],"related_contacts":["intro@gopher.email"],"email_method":"cc","headers":{"return-path":"<jorenm@gmail.com>","received":["from mail-ua0-f169.google.com (mail-ua0-f169.google.com [209.85.217.169]) by inbound-smtp.us-east-1.amazonaws.com with SMTP id gj2iv2anfln630ag6t2mhc9mi1oh74ctgftmilo1 for intro@gopher.email; Wed, 23 Aug 2017 06:28:22 +0000 (UTC)","by mail-ua0-f169.google.com with SMTP id d12so2616468uag.1 for <intro@gopher.email>; Tue, 22 Aug 2017 23:28:22 -0700 (PDT)","by 10.159.52.67 with HTTP; Tue, 22 Aug 2017 23:28:21 -0700 (PDT)"],"x-ses-spam-verdict":"pass","x-ses-virus-verdict":"pass","received-spf":"pass (spfCheck: domain of _spf.google.com designates 209.85.217.169 as permitted sender) client-ip=209.85.217.169; envelope-from=jorenm@gmail.com; helo=mail-ua0-f169.google.com;","authentication-results":"amazonses.com; spf=pass (spfCheck: domain of _spf.google.com designates 209.85.217.169 as permitted sender) client-ip=209.85.217.169; envelope-from=jorenm@gmail.com; helo=mail-ua0-f169.google.com; dkim=pass header.i=@gmail.com;","x-ses-receipt":"AEFBQUFBQUFBQUFFVktQM3Yrem5YSkl4UzRVeFRLZ0dRdkQ3Rmx3a21NUDFjbUE3U3lKSExROE1SSEVOaGtjYkhZUlBYSzVhOHdHSTZWRkxtQ2swcEtXZ3ArempEVDh2djlJUlp2MUswSTRTOWtmN0FuUHptZ2ZQb2JZMUNoK2dtU0dtbmtZOHNVVzY2SCt0ZEhnVVZPaE15Q0Z2VFdTNUQ0d0ZkQmp2cHFONjVhcFQ3aVlUY3dFakZJZFhTT2xSZ0wwOTNldEVKZDhFa3BzTmMrSm85Q3lHMUF2anZTQlFkTE5kcDJYeUM4d3NQaS82ZHl6TXlQa0NRTGZJQzRSRFp4S01TM0hTRWowdlZyZWdkbmVXb3lGK045a2hyNUNnTQ==","x-ses-dkim-signature":"v=1; a=rsa-sha256; q=dns/txt; c=relaxed/simple; s=224i4yxa5dv7c2xz3womw6peuasteono; d=amazonses.com; t=1503469703; h=X-SES-RECEIPT:MIME-Version:From:Date:Message-ID:Subject:To:Cc:Content-Type; bh=Vmw/4eGtpGuW4S+kAN0p7/eYWKtsDyQVJNpklrxvzPY=; b=P/i9Mb3I6z0P5jh5beXbI1EIzZoEvx86VAOwQbc2/vzk5/YYakTYFP9FpeuHDpfp BWWos8yRjGWxiacaAfq/+exZhFjBJh8SPqKLrGjOjDafdCNnZkz4wS7PnUBJztLQpLI 8pPnzuQHO+eHUlims+mNGlCGfKe+RAVdlws1D4GI=","dkim-signature":"v=1; a=rsa-sha256; c=relaxed/relaxed; d=gmail.com; s=20161025; h=mime-version:from:date:message-id:subject:to:cc; bh=Vmw/4eGtpGuW4S+kAN0p7/eYWKtsDyQVJNpklrxvzPY=; b=N/BsYVxQWOT9eSmqRblNfTTJ/6310G6shB1jJifrZPblMXP6Ta7UIQ/oLcikfJgHf6 KjrhO9R6+ljaBA53eDnzu5yYKmMWLRxE3WXrHkSvoCZ3l9kkq+lLg8sZEF156Dw0FrUs M9jj7TKzvm8X0e+ztTW0+utkcekLJQTrkRP7G3adb03qDlSL7sqjfWJWgF4FpTWE3L9N eCGp/ALt4UHAM4tRY+H8WY4M0Gdzo9tGkPFYP1egjf/Vr2/qFH6+lCM5hfprf58rZUTT hLVFxhDO9VnI244tRcKtdsSOeiVh6L53xGzpeqI7RlEz0Jw3OU9wn1ISAhlbUkJQ2USl Znyw==","x-google-dkim-signature":"v=1; a=rsa-sha256; c=relaxed/relaxed; d=1e100.net; s=20161025; h=x-gm-message-state:mime-version:from:date:message-id:subject:to:cc; bh=Vmw/4eGtpGuW4S+kAN0p7/eYWKtsDyQVJNpklrxvzPY=; b=MtYrAL8HUsHnYQD2cMq57Efk8Cx+gD/0+8SBKPB0JSRvkzmZqh08GRHH55s/Y50v3W KF8oVtJOowbToV9AyfQYwlFkfHqY9yiSOQva9lh8fUA7y2OlWb9FrXv+/0KWuXjmU7DO D8/xm0Dqdz6J1rETzp0LvSJyxT5lCPGlLjPlTWFc29oxxYr/AZnnZnyJp1dnfmZBCWLX Nadh+PqWdXQTvICz9vEsB+49iHYq2rxSGWSYRSA31OsX43jaUIaf+8Djj+7G0ahow1/1 Ovrp2tJBkKSedLFZbUfs1AP/xFAQNNSGeb5pRSUEM3+/3X9zYgmV8X63MInyjWztVe0c C+Xg==","x-gm-message-state":"AHYfb5ixSNQIHkFCcDArRKDPYLqaeC+yUdopvDNY9xQRSijQ3dE6kwSU SEqK5dJYglwcazMHxQB22v+yxwgT4wOm","x-received":"by 10.159.35.2 with SMTP id 2mr1146851uae.8.1503469702185; Tue, 22 Aug 2017 23:28:22 -0700 (PDT)","mime-version":"1.0","from":"Joren Mathews <jorenm@gmail.com>","date":"Tue, 22 Aug 2017 23:28:21 -0700","message-id":"<CAJqkShOx3D8F8fJ9Dr1zONhSotWqST-o4Gtvvfjn6NoCv3TsEA@mail.gmail.com>","subject":"aaa","to":"joren@300feetout.com","cc":"intro@gopher.email","content-type":"multipart/alternative; boundary=\\"001a113d069a878b70055765d1fe\\"","x-ses-dkim-verdict":"pass","x-ses-spf-verdict":"pass"}}}}',
  isOffline: true }

// module.exports.onCommand = { headers:
//    { Host: 'salesforce.ngrok.io',
//      'X-FUT-Timestamp': '1502768299',
//      'X-FUT-Signature': '187366cb0684aafadca094efa841acd6c6cadf11779b5b40d5a30e6ca6a89fde',
//      'Content-Type': 'application/json',
//      'User-Agent': 'Guzzle/3.9.3 curl/7.47.1 PHP/5.6.26',
//      'Content-Length': 5043,
//      'X-Forwarded-For': '52.207.132.164' },
//   path: '/onCommand',
//   pathParameters: null,
//   requestContext:
//    { accountId: 'offlineContext_accountId',
//      resourceId: 'offlineContext_resourceId',
//      apiId: 'offlineContext_apiId',
//      stage: 'dev',
//      requestId: 'offlineContext_requestId_',
//      identity:
//       { cognitoIdentityPoolId: 'offlineContext_cognitoIdentityPoolId',
//         accountId: 'offlineContext_accountId',
//         cognitoIdentityId: 'offlineContext_cognitoIdentityId',
//         caller: 'offlineContext_caller',
//         apiKey: 'offlineContext_apiKey',
//         sourceIp: '127.0.0.1',
//         cognitoAuthenticationType: 'offlineContext_cognitoAuthenticationType',
//         cognitoAuthenticationProvider: 'offlineContext_cognitoAuthenticationProvider',
//         userArn: 'offlineContext_userArn',
//         userAgent: 'Guzzle/3.9.3 curl/7.47.1 PHP/5.6.26',
//         user: 'offlineContext_user' },
//      authorizer: { principalId: 'offlineContext_authorizer_principalId' },
//      resourcePath: '/onCommand',
//      httpMethod: 'POST' },
//   resource: '/onCommand',
//   httpMethod: 'POST',
//   queryStringParameters: null,
//   stageVariables: null,
//   body: '{"webhook":{"name":"onCommand","timestamp":1502768299},"extension":{"private_data":{"fut_access_token":"57d760996402fdc08a0025a9343ffd4108a309b7","google_calendar_access_token":"ya29.GlumBHHyvBwyuwtoKmYV4GCqhsHLtt3KLrUdEweTQFdAT6Ics2PF2n29ELzdXs_c8PAQKHZDs96Gqw-a8rbUe5FV751AvnpIUdgl9kVKMIFMw2MgAFo-kR7cnNBl","google_calendar_refresh_token":"1/wwhKuxK1eXe_0CjeHdGgKeil-oDb9siKhr0tQLBOeIzNCgvrUDSy0AkNsjCIHPX_","salesforce_access_token":"00Dd0000000do8N!ARsAQHe.B10cORFcgtv7qqA1v5CiS5T4nprn92PoCl5gO_nDAkj_Vvs.NPQ2DST632ih9YIqrEcbTJ46GbiFDc69.UBjJYCI","salesforce_refresh_token":"5Aep861.EkZJuT7_ltFlB.TxNfs38kZHucpB.JfHuMpSrAFSvR9b8WvnLOGEJWtbOhbxGEA8hentAvbD93lyg0M","salesforce_instance_url":"https://na51.salesforce.com"},"shared_data":[]},"user":{"email":"jorenm@gmail.com","name":"Joren Mathews","timezone":"America/Los_Angeles","preferred_date_format":"D, F jS Y g:ia T","confirmations":false,"postponeTimes":["2h","4h","8h","1d","3d","1w","2w","1mo","3mo","6mo","1y"],"defaultDailyReminderTime":6,"disableMailtoLinks":true},"params":["2minutes"],"flag":"salesforce_dev","command":"salesforce_dev.2minutes","followup":{"source":{"recipient":"salesforce_dev.2minutes@gopher.email","subject":"Dolar sit amet","body":"<div dir=\\"ltr\\">Zardlork</div>\\n","body_text":"Zardlork\\n","from":"jorenm@gmail.com","external_recipients":["Joren Mathews <joren@isimple.net>"],"related_contacts":[],"email_method":"bcc","headers":{"return-path":"<jorenm@gmail.com>","received":["from mail-vk0-f47.google.com (mail-vk0-f47.google.com [209.85.213.47]) by inbound-smtp.us-east-1.amazonaws.com with SMTP id hf9qn6ng873hj518ap60vqfr4j2q9i7rjk79p8g1 for salesforce_dev.2minutes@gopher.email; Tue, 15 Aug 2017 03:38:17 +0000 (UTC)","by mail-vk0-f47.google.com with SMTP id n125so37614160vke.1 for <salesforce_dev.2minutes@gopher.email>; Mon, 14 Aug 2017 20:38:17 -0700 (PDT)","by 10.176.24.144 with HTTP; Mon, 14 Aug 2017 20:38:16 -0700 (PDT)"],"x-ses-spam-verdict":"pass","x-ses-virus-verdict":"pass","received-spf":"pass (spfCheck: domain of _spf.google.com designates 209.85.213.47 as permitted sender) client-ip=209.85.213.47; envelope-from=jorenm@gmail.com; helo=mail-vk0-f47.google.com;","authentication-results":"amazonses.com; spf=pass (spfCheck: domain of _spf.google.com designates 209.85.213.47 as permitted sender) client-ip=209.85.213.47; envelope-from=jorenm@gmail.com; helo=mail-vk0-f47.google.com; dkim=pass header.i=@gmail.com;","x-ses-receipt":"AEFBQUFBQUFBQUFFWTl6M0RXZWtETDJXaGJweVFhUHVZN1Q1c2NBcDIraC92bU5QbEpkc0ptRDNRSUlBTGU0a2IzUHEyZHhPcDBLZHBTNzljWjhWOEMvQUNrV1hYclczazRTd1hLS21oZ1FZVnlNMy83ZUFZZGMzczNzN2lPTUhDSWt4OTdmUTRiVk9sZXBFL3pTaVVYZXQyS3BJTmtaVUlYb1hwbnZIVFpMRDlHVkY0WWMxYzljcDR0eGNlVE5RWENkYXJCL2ZZK1pUV25CL1o5cWFKVTlNRmpybjlTdEJ5bTVQSmlqR1g2SXZFd0JwcDBRU2pmclkzUUFYcThabTM0WUJRQko3NTlqL1dDdkcrb094TGduajhWWnViTG45OA==","x-ses-dkim-signature":"v=1; a=rsa-sha256; q=dns/txt; c=relaxed/simple; s=224i4yxa5dv7c2xz3womw6peuasteono; d=amazonses.com; t=1502768298; h=X-SES-RECEIPT:MIME-Version:From:Date:Message-ID:Subject:To:Content-Type:Bcc; bh=PXXicB/vFc9T5ywV8g7lPAoATkwb728GalYbQWnJ0Gk=; b=Wx1eM571lEw3JRN3hy9SNvbpfOJGxFhr/qs6CJJzzZbovaG43vnT0sKHyHa9Q95n zCmAwUPQxkyFg9MkZav7Q5WxhjlvFgnSaEGcKd0oQlMmapHl3lLvcDl+q36mxTkKFFP 7DZx3baYJWW9iup4HvqPMFSgJxgzXASMokBk/vpE=","dkim-signature":"v=1; a=rsa-sha256; c=relaxed/relaxed; d=gmail.com; s=20161025; h=mime-version:from:date:message-id:subject:to; bh=PXXicB/vFc9T5ywV8g7lPAoATkwb728GalYbQWnJ0Gk=; b=rReYJXx0jBb0mYGYKhg2szkmxY2tGKfwqsd3Qjqt6ky76gNNVqwRFNCZ0logCfw/Iq WkY0m36Z8Sjzndh34Rmt0T7m5SmhZDxdqsH2cak/JUg2cU7u4Qz6a8pn+i8H9kdXXdtZ YrXXG2e/ypmhs/lyNzNXkidrvuvZ/TErTej0jLx7JcpPxxWfCQzNlJJ5yjRIVLVpEawO nufAeActHPkXjT1FLJUAbvPyppObG7k+HprnH0hHitZLAxa0uodsDKWC9wRSCUixl4Xy J03bGjOW6WoYsXx5p6ebsP9t4AhbDEexAcqKpgvPvqVXa4bAQsrXoZ05YVqAcCniHkKZ VCrw==","x-google-dkim-signature":"v=1; a=rsa-sha256; c=relaxed/relaxed; d=1e100.net; s=20161025; h=x-gm-message-state:mime-version:from:date:message-id:subject:to; bh=PXXicB/vFc9T5ywV8g7lPAoATkwb728GalYbQWnJ0Gk=; b=s2eTI4GcI5b/VCJV1f/anX9WXKQP2KJmipSE1BSCAOkBsYB+SnhAowrSjkAHoKeeXJ fXb+VKoJHMe5ga0r/Ml3WoqpRkidmDM9zTRI1H8/UQY5Fl9wHQL2I1O8+VK7UwiOyHed gpF2i/yj9J/WGWy/baMN40tdHegGCJ7+M6WolDtN9ToxFAJes18XguSrtIbbpm34zoW8 NbDkpdKgOiBkk46P3lG78MAKYYincHPLHrk0rTQ9M+50K96TwIxyzUToO/ppmY2jKiYD aTCd7eaGCwia+Tf5jOghYkNmBVczUjxJdxjscAqOY32gqQ3dKXiLPuQiZAcJqXZeOT5s WwAg==","x-gm-message-state":"AHYfb5ggOf7xhQmsLuFvWczBadaEKeiN5SaaxpuwGSUhoJO7EebuBHaG WngmLmvHswaZjsMT+4a0q4QYRRcAGw==","x-received":"by 10.31.96.209 with SMTP id u200mr16931834vkb.63.1502768297209; Mon, 14 Aug 2017 20:38:17 -0700 (PDT)","mime-version":"1.0","from":"Joren Mathews <jorenm@gmail.com>","date":"Mon, 14 Aug 2017 20:38:16 -0700","message-id":"<CAJqkShOP3UPGTu6SYX2Kz9rJQeGmh_H41K7HVaV-dAp_Kv8DDw@mail.gmail.com>","subject":"Dolar sit amet","to":"Joren Mathews <joren@isimple.net>","content-type":"multipart/alternative; boundary=\\"001a114e2cbc88f7730556c28293\\"","bcc":"salesforce_dev.2minutes@gopher.email","x-ses-dkim-verdict":"pass","x-ses-spf-verdict":"pass"}}}}',
//   isOffline: true };

module.exports.onFollowup = { headers:
   { Host: 'salesforce.ngrok.io',
     'X-FUT-Timestamp': '1503205885',
     'X-FUT-Signature': 'ec64ed687b4c16997fec772aeb9e8f4fb853911d176bc93b66a92459a5d43e0d',
     'Content-Type': 'application/json',
     'User-Agent': 'Guzzle/3.9.3 curl/7.47.1 PHP/5.6.26',
     'Content-Length': 1927,
     'X-Forwarded-For': '107.23.207.184' },
  path: '/onFollowup',
  pathParameters: null,
  requestContext:
   { accountId: 'offlineContext_accountId',
     resourceId: 'offlineContext_resourceId',
     apiId: 'offlineContext_apiId',
     stage: 'dev',
     requestId: 'offlineContext_requestId_',
     identity:
      { cognitoIdentityPoolId: 'offlineContext_cognitoIdentityPoolId',
        accountId: 'offlineContext_accountId',
        cognitoIdentityId: 'offlineContext_cognitoIdentityId',
        caller: 'offlineContext_caller',
        apiKey: 'offlineContext_apiKey',
        sourceIp: '127.0.0.1',
        cognitoAuthenticationType: 'offlineContext_cognitoAuthenticationType',
        cognitoAuthenticationProvider: 'offlineContext_cognitoAuthenticationProvider',
        userArn: 'offlineContext_userArn',
        userAgent: 'Guzzle/3.9.3 curl/7.47.1 PHP/5.6.26',
        user: 'offlineContext_user' },
     authorizer: { principalId: 'offlineContext_authorizer_principalId' },
     resourcePath: '/onFollowup',
     httpMethod: 'POST' },
  resource: '/onFollowup',
  httpMethod: 'POST',
  queryStringParameters: null,
  stageVariables: null,
  body: '{"webhook":{"name":"onFollowup","timestamp":1503205885},"user":{"email":"jorenm@gmail.com","name":"Joren Mathews","timezone":"America/Los_Angeles","preferred_date_format":"D, F jS Y g:ia T","confirmations":false,"postponeTimes":["2h","4h","8h","1d","3d","1w","2w","1mo","3mo","6mo","1y"],"defaultDailyReminderTime":6,"disableMailtoLinks":true},"followup":{"valid":true,"created":1503205877,"timezone":"America/Los_Angeles","created_friendly":"Sat, August 19th 2017 10:11pm PDT","due":1503205882,"due_friendly":"Sat, August 19th 2017 10:11pm PDT","format":"5seconds-salesforce_dev+5seconds","completed":false,"completed_on":"","completed_on_friendly":"","tags":["5seconds"],"suffix_flags":["salesforce_dev"],"extensions":{"sms":false,"task":false,"recurring":false,"response_detection":false},"user_date_format":"12h","followup_id":"20698294","source":{"type":"email","subject":"asdf","body":"<div dir=\\"ltr\\">fdsasdfasdf</div><br />","body_text":" fdsasdfasdf  ","from":"jorenm@gmail.com","external_recipients":["joren@isimple.net"],"related_contacts":["5seconds-salesforce_dev+5seconds@gopher.email"],"email_method":"cc"},"extension":{"followup_data":{"salesforceContact":"003d000001ZALUbAAP","salesforceActivity":"00T0V00003lwZFIUA2"}}},"extension":{"private_data":{"fut_access_token":"57d760996402fdc08a0025a9343ffd4108a309b7","google_calendar_access_token":"ya29.GlumBHHyvBwyuwtoKmYV4GCqhsHLtt3KLrUdEweTQFdAT6Ics2PF2n29ELzdXs_c8PAQKHZDs96Gqw-a8rbUe5FV751AvnpIUdgl9kVKMIFMw2MgAFo-kR7cnNBl","google_calendar_refresh_token":"1/wwhKuxK1eXe_0CjeHdGgKeil-oDb9siKhr0tQLBOeIzNCgvrUDSy0AkNsjCIHPX_","salesforce_access_token":"00Dd0000000do8N!ARsAQOMHBPsJTtcgznewqyv94UbfFWdKfsQl085fuV1VuCHxTaNEdShd0shPW1zGIqIIWKDOIES2jejSat2wmcHSGTnypFyh","salesforce_refresh_token":"5Aep861.EkZJuT7_ltFlB.TxNfs38kZHucpB.JfHuMpSrAFSvQjlgpVEOd05QpiZkOgHuQwB.XgSVB4SqxVNLFY","salesforce_instance_url":"https://na51.salesforce.com"},"shared_data":[]}}',
  isOffline: true };

module.exports.onRequestOptions = {};

// log call
 // module.exports.onAction = { headers:
 //   { Host: 'salesforce.ngrok.io',
 //     'X-FUT-Timestamp': '1502770783',
 //     'X-FUT-Signature': 'b248ec0cc9821db705a27da8a15a020feebe5c5825baf3739f69f18854cab56f',
 //     'Content-Type': 'application/json',
 //     'User-Agent': 'Guzzle/3.9.3 curl/7.47.1 PHP/5.6.26',
 //     'Content-Length': 5692,
 //     'X-Forwarded-For': '52.91.40.70' },
 //  path: '/onAction',
 //  pathParameters: null,
 //  requestContext:
 //   { accountId: 'offlineContext_accountId',
 //     resourceId: 'offlineContext_resourceId',
 //     apiId: 'offlineContext_apiId',
 //     stage: 'dev',
 //     requestId: 'offlineContext_requestId_',
 //     identity:
 //      { cognitoIdentityPoolId: 'offlineContext_cognitoIdentityPoolId',
 //        accountId: 'offlineContext_accountId',
 //        cognitoIdentityId: 'offlineContext_cognitoIdentityId',
 //        caller: 'offlineContext_caller',
 //        apiKey: 'offlineContext_apiKey',
 //        sourceIp: '127.0.0.1',
 //        cognitoAuthenticationType: 'offlineContext_cognitoAuthenticationType',
 //        cognitoAuthenticationProvider: 'offlineContext_cognitoAuthenticationProvider',
 //        userArn: 'offlineContext_userArn',
 //        userAgent: 'Guzzle/3.9.3 curl/7.47.1 PHP/5.6.26',
 //        user: 'offlineContext_user' },
 //     authorizer: { principalId: 'offlineContext_authorizer_principalId' },
 //     resourcePath: '/onAction',
 //     httpMethod: 'POST' },
 //  resource: '/onAction',
 //  httpMethod: 'POST',
 //  queryStringParameters: null,
 //  stageVariables: null,
 //  body: '{"webhook":{"name":"onAction","timestamp":1502770783},"user":{"email":"jorenm@gmail.com","name":"Joren Mathews","timezone":"America/Los_Angeles","preferred_date_format":"D, F jS Y g:ia T","confirmations":false,"postponeTimes":["2h","4h","8h","1d","3d","1w","2w","1mo","3mo","6mo","1y"],"defaultDailyReminderTime":6,"disableMailtoLinks":true},"followup":{"valid":true,"created":1502770378,"timezone":"America/Los_Angeles","created_friendly":"Mon, August 14th 2017 9:12pm PDT","due":1502770498,"due_friendly":"Mon, August 14th 2017 9:14pm PDT","format":"2minutes-salesforce_dev+2minutes","completed":true,"completed_on":1502770508,"completed_on_friendly":"Mon, August 14th 2017 9:15pm PDT","tags":["2minutes"],"suffix_flags":["salesforce_dev"],"extensions":{"sms":false,"task":false,"recurring":false,"response_detection":false},"user_date_format":"12h","followup_id":"20641661","source":{"type":"email","subject":"Dolar sit amet","body":"<div dir=\\"ltr\\">Zardlork</div><br />","body_text":" Zardlork  ","from":"jorenm@gmail.com","external_recipients":["joren@isimple.net"],"related_contacts":["2minutes-salesforce_dev+2minutes@gopher.email"],"email_method":"cc"},"extension":{"followup_data":null}},"extension":{"private_data":{"fut_access_token":"57d760996402fdc08a0025a9343ffd4108a309b7","google_calendar_access_token":"ya29.GlumBHHyvBwyuwtoKmYV4GCqhsHLtt3KLrUdEweTQFdAT6Ics2PF2n29ELzdXs_c8PAQKHZDs96Gqw-a8rbUe5FV751AvnpIUdgl9kVKMIFMw2MgAFo-kR7cnNBl","google_calendar_refresh_token":"1/wwhKuxK1eXe_0CjeHdGgKeil-oDb9siKhr0tQLBOeIzNCgvrUDSy0AkNsjCIHPX_","salesforce_access_token":"00Dd0000000do8N!ARsAQHe.B10cORFcgtv7qqA1v5CiS5T4nprn92PoCl5gO_nDAkj_Vvs.NPQ2DST632ih9YIqrEcbTJ46GbiFDc69.UBjJYCI","salesforce_refresh_token":"5Aep861.EkZJuT7_ltFlB.TxNfs38kZHucpB.JfHuMpSrAFSvR9b8WvnLOGEJWtbOhbxGEA8hentAvbD93lyg0M","salesforce_instance_url":"https://na51.salesforce.com"},"shared_data":[]},"action_data":{"action":"add_notes","subject":"Colors","body":"<div dir=\\"ltr\\">Black red blue</div>\\n","source":{"return-path":"<jorenm@gmail.com>","received":["from mail-vk0-f47.google.com (mail-vk0-f47.google.com [209.85.213.47]) by inbound-smtp.us-east-1.amazonaws.com with SMTP id sqt91ntf90pmk635fben2vrftg6mo1uijn25cq01 for a+add_notes+t.20641661+salesforce_dev+9a9fce@gopher.email; Tue, 15 Aug 2017 04:19:41 +0000 (UTC)","by mail-vk0-f47.google.com with SMTP id u133so37610712vke.3 for <a+add_notes+t.20641661+salesforce_dev+9a9fce@gopher.email>; Mon, 14 Aug 2017 21:19:41 -0700 (PDT)","by 10.176.24.144 with HTTP; Mon, 14 Aug 2017 21:19:40 -0700 (PDT)"],"x-ses-spam-verdict":"pass","x-ses-virus-verdict":"pass","received-spf":"pass (spfCheck: domain of _spf.google.com designates 209.85.213.47 as permitted sender) client-ip=209.85.213.47; envelope-from=jorenm@gmail.com; helo=mail-vk0-f47.google.com;","authentication-results":"amazonses.com; spf=pass (spfCheck: domain of _spf.google.com designates 209.85.213.47 as permitted sender) client-ip=209.85.213.47; envelope-from=jorenm@gmail.com; helo=mail-vk0-f47.google.com; dkim=pass header.i=@gmail.com;","x-ses-receipt":"AEFBQUFBQUFBQUFHR1ZNSlBPUWYzamk4dTIzcTNvRU5oZE9YbmhHT1poZGRYYWlFL2dBWjhsdVI2TTZmL3NPS1pKMEhKMWZKZkVucXlna05uSHBxZ1NGTkt1U1NpMXQxVTljbkJmNm5lYzduNUR1Wit0enFQYU5wRncwMXRnMGdCbWRnS1pqUTRhOW5jNkV4TEVtZWYycGRFSXdIOEg0WmZEdElGb2s4K0dST1VhMEFGdC9WYXpIeEw2L0wzSUhLZVdJME1lYnRzSVhVNmd1TXhvVGZQYXJZaTQrT25aVUZHa2Y1c213bTM1eWg3dUplbEhMSVFEVzM0bm5MTXM2WFp6bjQxV1AxbVpWSitzU1MzSHFGV3VLOVdtbHRjNnJSQw==","x-ses-dkim-signature":"v=1; a=rsa-sha256; q=dns/txt; c=relaxed/simple; s=224i4yxa5dv7c2xz3womw6peuasteono; d=amazonses.com; t=1502770782; h=X-SES-RECEIPT:MIME-Version:From:Date:Message-ID:Subject:To:Content-Type; bh=jTkBlDoJoFnIxNnj0JdtkNxj0PbqtEcorT8yIenN4Sc=; b=bsBnajT6Jl+6OKNoHpDJp0yzkLT47vTCjAJ8H6bvgIHTjhK9nFf2ESOCAiAB81dP yIZsjvUCVJbtqTDBBXBvmHC6JN9pse6+j8RmKVmCx+wOojWTdmqyhU3oERdpWr6hoZi QKJFKRQRJ8+WdBKieBn3nbYtrvtOGIbpX45xhoOw=","dkim-signature":"v=1; a=rsa-sha256; c=relaxed/relaxed; d=gmail.com; s=20161025; h=mime-version:from:date:message-id:subject:to; bh=jTkBlDoJoFnIxNnj0JdtkNxj0PbqtEcorT8yIenN4Sc=; b=RPIxDpta3xSvCdI1JgVENttFu1MP4eOS1hwbzHNkXwXyMf2y6Q2XrVrErqzdiRi8BG sx/O71EhiHJR3PFw331FDriKhTGsXwZsP3jA9zZv+JlQuyphBvWSt1A9LYPayiD9vqdw CrbL1/RLf/sRYnxR7VK3Wtu2dUGCCkzpRBFp7jCaE9Jvwqpu+Yh8Y5yfdKJQ3wTHV8SO Qlh2yuhO53kVOR4JOKgCReUzZuVJ3Fhj7U/CMuWTOgi2cNQXwV9DVIB5PFWWzlLpia9z JSoGHdIJimWAWJA4Adg1+5Vomp0jln+QIRUBO1v7UNuMioVnHe98dPu2NvQamCVyXJXV nyJQ==","x-google-dkim-signature":"v=1; a=rsa-sha256; c=relaxed/relaxed; d=1e100.net; s=20161025; h=x-gm-message-state:mime-version:from:date:message-id:subject:to; bh=jTkBlDoJoFnIxNnj0JdtkNxj0PbqtEcorT8yIenN4Sc=; b=fUooe83+8ab66YWltKq4Bx4DcCw78ejdER8nInGzl3AG4TrQItHUxss/7vFrBT5I52 SSHszrOYGxvcuJGMYEvxc1DoJ3foyYUrvteTosBNPGB89uwuS8q2aM2lAqAYVotBSyvU SUVzyI2cTTA5YC/9yyOxvv1g0a5n/8Jfgxbjgr+uLt2CvPbl4kOeij23qcux/6iluc22 vL/abaHynHBmdWOnurYjlMiRjkZEB5MEP++3RdcWQsB4TGYY4ce2Py1O2TAtuuVk4GxZ 25h3AMGV2jokPz4vdwfB2wYLymZ6krRw8kgOc7zxSN1JFLZ6aEoDpss1D7zE3R4zla8R ELCA==","x-gm-message-state":"AHYfb5iJXZsBETCtdbauDO3Shd6JVjYYkOfgqDxpJjQfd7SNXSIQJxYz AI2GeASTR2+mKWfSLk3WYOqiwf7ZqbAR","x-received":"by 10.31.132.11 with SMTP id g11mr16616096vkd.42.1502770781129; Mon, 14 Aug 2017 21:19:41 -0700 (PDT)","mime-version":"1.0","from":"Joren Mathews <jorenm@gmail.com>","date":"Mon, 14 Aug 2017 21:19:40 -0700","message-id":"<CAJqkShMhZNvefcya-LtZT0GJygLekmbRqBTYUTSR_tj5x6ZQQA@mail.gmail.com>","subject":"Colors","to":"a+add_notes+t.20641661+salesforce_dev+9a9fce@gopher.email","content-type":"multipart/alternative; boundary=\\"001a1144fa009694ae0556c31681\\"","x-ses-dkim-verdict":"pass","x-ses-spf-verdict":"pass","type":"email"}}}',
 //  isOffline: true };

// postpone
  module.exports.onAction = { headers:
   { Host: 'introcmd.ngrok.io',
     'X-FUT-Timestamp': '1503467755',
     'X-FUT-Signature': '4409236c86b06ccc76b13d941db9917271a1342be70a90eff24a770b8e092926',
     'Content-Type': 'application/json',
     'User-Agent': 'Guzzle/3.9.3 curl/7.47.1 PHP/5.6.26',
     'Content-Length': 4957,
     'X-Forwarded-For': '52.91.175.163' },
  path: '/onAction',
  pathParameters: null,
  requestContext:
   { accountId: 'offlineContext_accountId',
     resourceId: 'offlineContext_resourceId',
     apiId: 'offlineContext_apiId',
     stage: 'dev',
     requestId: 'offlineContext_requestId_',
     identity:
      { cognitoIdentityPoolId: 'offlineContext_cognitoIdentityPoolId',
        accountId: 'offlineContext_accountId',
        cognitoIdentityId: 'offlineContext_cognitoIdentityId',
        caller: 'offlineContext_caller',
        apiKey: 'offlineContext_apiKey',
        sourceIp: '127.0.0.1',
        cognitoAuthenticationType: 'offlineContext_cognitoAuthenticationType',
        cognitoAuthenticationProvider: 'offlineContext_cognitoAuthenticationProvider',
        userArn: 'offlineContext_userArn',
        userAgent: 'Guzzle/3.9.3 curl/7.47.1 PHP/5.6.26',
        user: 'offlineContext_user' },
     authorizer: { principalId: 'offlineContext_authorizer_principalId' },
     resourcePath: '/onAction',
     httpMethod: 'POST' },
  resource: '/onAction',
  httpMethod: 'POST',
  queryStringParameters: null,
  stageVariables: null,
  body: '{"webhook":{"name":"onAction","timestamp":1503467755},"user":{"email":"jorenm@gmail.com","name":"Joren Mathews","timezone":"America/Los_Angeles","preferred_date_format":"D, F jS Y g:ia T","confirmations":false,"postponeTimes":["2h","4h","8h","1d","3d","1w","2w","1mo","3mo","6mo","1y"],"defaultDailyReminderTime":6,"disableMailtoLinks":true},"followup":{"valid":true,"created":1503467589,"timezone":"America/Los_Angeles","created_friendly":"Tue, August 22nd 2017 10:53pm PDT","due":1503467590,"due_friendly":"Tue, August 22nd 2017 10:53pm PDT","format":"1sec-intro","completed":true,"completed_on":1503467594,"completed_on_friendly":"Tue, August 22nd 2017 10:53pm PDT","tags":[],"suffix_flags":["intro"],"extensions":{"sms":false,"task":false,"recurring":false,"response_detection":false},"user_date_format":"12h","followup_id":"20734011","source":{"type":"email","subject":"Reilly Sweetland | Gopher","body":"","body_text":"","from":"jorenm@gmail.com","external_recipients":[],"related_contacts":["joren@isimple.net"],"email_method":"to"},"extension":{"followup_data":null}},"extension":{"private_data":{"fut_access_token":"990504da2835be717e0b21ece8a9762bfcfabb75"},"shared_data":[]},"action_data":{"action":"postpone.1sec","subject":"Hit send to postpone","body":"<div dir=\\"ltr\\"><br></div>\\n","source":{"return-path":"<jorenm@gmail.com>","received":["from mail-ua0-f175.google.com (mail-ua0-f175.google.com [209.85.217.175]) by inbound-smtp.us-east-1.amazonaws.com with SMTP id n3o2c7g8qimt1v4nslhsbs1il542la6ah3t6glg1 for a+postpone.1sec+t.20734011+intro+e1635c@gopher.email; Wed, 23 Aug 2017 05:55:54 +0000 (UTC)","by mail-ua0-f175.google.com with SMTP id j45so2417157uaf.2 for <a+postpone.1sec+t.20734011+intro+e1635c@gopher.email>; Tue, 22 Aug 2017 22:55:53 -0700 (PDT)","by 10.159.52.67 with HTTP; Tue, 22 Aug 2017 22:55:53 -0700 (PDT)"],"x-ses-spam-verdict":"pass","x-ses-virus-verdict":"pass","received-spf":"pass (spfCheck: domain of _spf.google.com designates 209.85.217.175 as permitted sender) client-ip=209.85.217.175; envelope-from=jorenm@gmail.com; helo=mail-ua0-f175.google.com;","authentication-results":"amazonses.com; spf=pass (spfCheck: domain of _spf.google.com designates 209.85.217.175 as permitted sender) client-ip=209.85.217.175; envelope-from=jorenm@gmail.com; helo=mail-ua0-f175.google.com; dkim=pass header.i=@gmail.com;","x-ses-receipt":"AEFBQUFBQUFBQUFHMjl2VDdrRi9JT3FVaEUzdEFOMmpLNkNzNHFwN0dkRlpQb21OWGtvblV6MDFaOW9yaXhpeTNGY2pWbXZ4ckZjaGRPa1NlMThuMlZ6MHVkN0V3RVQ4a2ZPRGpzSHc0UjdxN1Zqc2Y1Vy9kRUg2QnB4cmVOM0FlRWZMbTREQ3B6dnVEUk5FRDEwbHNOYVhSblQxME9vZDVIeTlaVlYxVXNyL2F0SGtxeGd4LytzZEIvYmJqelBIZVQ5enpMMkxTdm1lRGltcjhPeXJqWWF0cEYvdGFvVHYvc0dxZ0E2ZWRZMWFzeGZtYUQyak80RmNDZkNyU3JKdlNnTVZ2eUdKOEpaMGZTZFJsakwxWUFYZHlPdzZzYmVNVg==","x-ses-dkim-signature":"v=1; a=rsa-sha256; q=dns/txt; c=relaxed/simple; s=224i4yxa5dv7c2xz3womw6peuasteono; d=amazonses.com; t=1503467754; h=X-SES-RECEIPT:MIME-Version:From:Date:Message-ID:Subject:To:Content-Type; bh=0LM3IUjAg54aN1ZtWy77QPN35LB8Nev9Zq/X8vlz7KA=; b=GeRWTJL38nCWsu1pbkf2SSZirqojTJUp41p7baPQbwPBXubzR/HC4VqJm/B0WCi+ +XyMCtqdM/zg0DxpEwU6zJ9eKsKRPNcPO2kKCfB29OI6JFwPviBb4VdLXk2xsRARkTZ c7RL3Ua2s06zgd5iAWSvfKo3+Bg96Sr2cKatkb2I=","dkim-signature":"v=1; a=rsa-sha256; c=relaxed/relaxed; d=gmail.com; s=20161025; h=mime-version:from:date:message-id:subject:to; bh=0LM3IUjAg54aN1ZtWy77QPN35LB8Nev9Zq/X8vlz7KA=; b=MBuQ3zsON+nIVglWu/K17PjYZY+u/eWyo6DFpQZGLZNjt/lONZfrSurlCooMkCib5R EkbD154MK+I2Io7tmIPo/ACHclt+yHiX4QtGRXhR57XwzHQumm6Vt5V51ZuGuzLRvM+A qDuhFkeN/Y0iO1MGDH2CDPC9u6d+Y7/KuLyZsSeYwXpWX1yKzQ9pr8iDpeioHl3GYn5O 9mKIzO5Yx67Z1ul35eyjx1plxLYa4jcxgJHv+y588qYKsUZ/fbgap+rrR8wgg5R8V23N 6OZVGBk/Q8gklbYLW7wzxWBxw4Yr6tGRtdI1trDt3o9GO12TGAutomSiSuxykglmTGq+ veNw==","x-google-dkim-signature":"v=1; a=rsa-sha256; c=relaxed/relaxed; d=1e100.net; s=20161025; h=x-gm-message-state:mime-version:from:date:message-id:subject:to; bh=0LM3IUjAg54aN1ZtWy77QPN35LB8Nev9Zq/X8vlz7KA=; b=JhLsImX221z/FsNzD9Xd6z7p6uIjh6m5kH9eBVbH6cMZwov0+i/uVOV/swgTCCclJb RcjPnSA8kIGW03SV5RrA7MGwaodTNJO1uXTUJt29DYTN5S3g16HNHIR0vUdk+lm3Gsw6 q/ac2j3YCesEDiOqz3tzmXcjhYO2wDVd9mw8TVOkiQswlGFW/cckWebJfY9Gq0FXuSrZ 04BrjVTQVR8+F5Me5xtXxtO1W08oLbAs5J7TLwuvfewBF1BNU5cXQpiA4wywsM5Xkwiq H1pEaQz16ep9xsS29wN1msco6W3uThwO0qZuOhnVq6pPj/PdwA357eZG/3XIWX4GMkHd 0R0g==","x-gm-message-state":"AHYfb5ilFpo1nAn2+FzlBBzgxGv+o3j46Pf1WKrWjB+dhNPCqyMgoQ67 N+zG1L8GwTJEA5EhArl2Rep5CdNiPyXH","x-received":"by 10.176.74.193 with SMTP id t1mr1001147uae.41.1503467753343; Tue, 22 Aug 2017 22:55:53 -0700 (PDT)","mime-version":"1.0","from":"Joren Mathews <jorenm@gmail.com>","date":"Tue, 22 Aug 2017 22:55:53 -0700","message-id":"<CAJqkShMYCunz2pYf1j6puGHBAULr3q8of95+fi8kkd3dewNWEQ@mail.gmail.com>","subject":"Hit send to postpone","to":"a+postpone.1sec+t.20734011+intro+e1635c@gopher.email","content-type":"multipart/alternative; boundary=\\"f403045f90565e91ea0557655d25\\"","x-ses-dkim-verdict":"pass","x-ses-spf-verdict":"pass","type":"email"}}}',
  isOffline: true }