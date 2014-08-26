var host = (process.env.HTTP_HOST || 'localhost');
var port = (process.env.HTTP_PORT || '8081');

exports.config = {
    specs: ['**/*.spec.js'],

    baseUrl: 'http://' + host + ':' + port,

    chromeDriver: '../node_modules/chromedriver/bin/chromedriver',

    chromeOnly: true,

    jasmineNodeOpts: {
        isVerbose: true,
        showColors: true
    }
};