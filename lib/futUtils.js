const Fut = require('fut-node');
const debug = require('debug')('fut:hooks');
const _ = require('lodash');
const config = require('./../config');

class futUtils {
	constructor(event, context, callback) {
		this.event = event;
		this.context = context;
		this.serverlessCallback = callback;
		this.parsedBody = JSON.parse(event.body);

		this.respondOk = this.respondOk.bind(this);
		this.respondError = this.respondError.bind(this);

		this.isSimulation = this._isSimulation(event);
		this.webhookValidated = this._isValidWebhook(event);
	}

	respondOk(res) {
		debug('onFollowup: Response Ok:', res);
		return this.serverlessCallback(null, {
			statusCode: 200,
			body: JSON.stringify(res)
		});
	}

	respondError(err) {
		debug('onFollowup: Response Error:', err);
		return this.serverlessCallback(null, {
			statusCode: 403,
			body: err
		});
	}

	getClient(accessToken) {
		let futClient = new Fut(config.fut);
		if (accessToken)
			futClient.setAccessToken(accessToken);
		return futClient;
	}

	_isValidWebhook(event) {
		const verifyAge = false; //set to true when testing / mocking

		// validates the webhook from the raw event object posted from AWS / Serverless
		debug('validateWebhook Event: ', event);
		const futClient = this.getClient();
		const webhookTimestamp = event.headers['X-FUT-Timestamp'] || event.headers['X-Fut-Timestamp']; //they come both ways
		const webhookSignature = event.headers['X-FUT-Signature'] || event.headers['X-Fut-Signature'];

		let rawBody = '';
		if (event.body)
			rawBody = event.body.toString()

		// sls offline does not esape forward slashes
		if (process.env.IS_OFFLINE)
			rawBody = rawBody.replace(new RegExp('\\/', 'g'), '\\/');

		debug(webhookSignature, webhookTimestamp, rawBody, verifyAge);
		return futClient.validateWebhook(webhookSignature, webhookTimestamp, rawBody, verifyAge);
	}

	_isSimulation(event) {
		// If ?simulation=1 is appended to URL, send back static, mocked response.
		if (_.get(event, 'queryStringParameters.simulation')) {
			debug('onCreate: simulation triggered');
			return true;
		}
		return false;
	}

}

module.exports = futUtils;
