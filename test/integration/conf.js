var host = (process.env.HTTP_HOST || 'localhost');
var port = (process.env.HTTP_PORT || '8081');

exports.config = {
    specs: ['**/*.spec.js'],

    baseUrl: 'http://' + host + ':' + port,

    jasmineNodeOpts: {
        isVerbose: true,
        showColors: true
    }
};