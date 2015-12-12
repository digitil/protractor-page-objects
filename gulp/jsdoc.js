var gulp = require('gulp');
var exec = require('child_process').exec;
var util = require('util');
var path = require('path');
var gls = require('gulp-live-server');
var package = require('../package.json');
 
gulp.task('jsdoc', function(callback) {
    var jsdoc = path.resolve(__dirname, '../node_modules/.bin/jsdoc');
    var command = [
        jsdoc,
        '--package package.json',
        '--configure docs/conf.json',
        '--destination docs',
        '--readme docs/readme.md',
        '--tutorials docs/tutorials'
    ].join(' ');

    exec(command, function (error) {
        if (error) {
            return callback(error);
        }
        callback();
    });
});

gulp.task('serve-docs', ['jsdoc'], function() {
    var serverPath = [
        gls.script,        
        ['docs', package.name, package.version].join('/'),
        8882
    ];
    server = gls(serverPath, undefined, false);
    server.start();
});

gulp.task('watch-jsdoc', ['serve-docs'], function() {
    gulp.watch([
        'lib/**/*.js',
        'docs/**/*.md',
    ], ['jsdoc']);
});