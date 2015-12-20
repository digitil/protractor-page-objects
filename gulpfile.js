var gulp = require('gulp');
var sequence = require('run-sequence');
require('./gulp');

gulp.task('lint', ['jshint', 'jscs']);
gulp.task('test', ['mocha', 'protractor']);
gulp.task('default', ['lint', 'test']);

gulp.task('publish', function() {
	sequence('default', 'jsdoc', 'gh-pages');
});