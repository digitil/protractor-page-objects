const { config } = require('./conf');

config.capabilities = {
	browserName: 'firefox',
	seleniumAddress: null
};

exports.config = config;