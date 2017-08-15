process.env.IS_OFFLINE = true; // Use offline config options
var config = require('../config');

// var request = require('supertest')(config.baseUrl);
var request = require('request-promise');
var expect = require('chai').expect;
var debug = require('debug')('gopher:test');
// var nock = require('nock');
// nock.recorder.rec();
// require('request-debug')(request);


// Hacked testing system that runs against a separately running, 
// serverless offline instance. TODO: Real Testing using nock, etc.
// To use this:
//    - Turn on nock recorder (nock.recorder.rec()) and capture your various events. Put them in test/mock.js.
//    - Run "npm run mock" to start your sls offline instance, so your endpoints can receive dumb requests which will 
//      be replace by those mocks.
//    - Use the web UI to fire http request to your endpoints, make sure they are working.
//    - If you want, run "npm run autotest" and map all of those files here. 
//    - Note: Ideally we'd use Nock to intercept outgoing HTTP requests to APIs. 
//      You may just want to comment out any out while you're tests are constantly runnning.


describe("onCommand webhook", function () {

  it("fires", function (done) {
    request
      .post(config.baseUrl + 'onCommand')
      .then(function (res) {
        // debug(res);
        // expect(res.body.status).to.equal(200);
        // expect(res.body.message).to.equal("This is a mocked response");
        done();
      })
      .catch((err) => {
        debug('error', err);
        done(err);
      })
  })
});

describe("onFollowup webhook", function () {

  it("fires", function (done) {
    request
      .post(config.baseUrl + 'onFollowup')
      .then(function (res) {
        // debug(res);
        // expect(res.body.status).to.equal(200);
        // expect(res.body.message).to.equal("This is a mocked response");
        done();
      })
      .catch((err) => {
        debug('error', err);
        done(err);
      })
  })
});


