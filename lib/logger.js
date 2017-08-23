var config = require('../config');
var Logger = require('logdna');
var options = {
    hostname: process.env.IS_OFFLINE ? 'localhost-reilly' : 'lambda',
    app: process.env.IS_OFFLINE ? 'gopher-salesforce-reilly' : 'gopher-salesforce',
};

// TODO: Move to config
// Defaults to false, when true ensures meta object will be searchable
options.index_meta = true;
options.command = 'salesforce';
module.exports = Logger.setupDefaultLogger(config.logDnaKey, options);