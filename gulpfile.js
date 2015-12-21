var gulp = require('gulp');
var sequence = require('run-sequence');
require('./gulp');

gulp.task('lint', ['jshint', 'jscs']);
gulp.task('test', ['mocha', 'protractor']);
gulp.task('default', ['lint', 'test']);

gulp.task('ci', function() {
	sequence('lint', 'mocha-ci', 'protractor-ci');
});

gulp.task('publish', function() {
	sequence('default', 'jsdoc', 'gh-pages');
});