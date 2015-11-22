var gulp = require('gulp');
var exec = require('child_process').exec;
var util = require('util');
 
gulp.task('jsdoc', function(callback) {
    var jsdoc = 'node_modules/.bin/jsdoc';

    exec([jsdoc, '--configure docs/conf.json'].join(' '), function (error) {
        if (error) {
            return callback(error);
        }
        callback();
    });
});

gulp.task('serve-docs', function() {

});

gulp.task('watch-jsdoc', function() {

});