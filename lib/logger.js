var config = require('../config');
var Logger = require('logdna');
var options = {
    hostname: process.env.IS_OFFLINE ? 'localhost-reilly' : 'lambda',
    app: process.env.IS_OFFLINE ? 'gopher-remind-reilly' : 'gopher-remind',
};

// Defaults to false, when true ensures meta object will be searchable
options.index_meta = true;
module.exports = Logger.setupDefaultLogger(config.logDnaKey, options);