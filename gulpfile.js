var gulp = require('gulp');
require('./gulp');

gulp.task('lint', ['jshint']);
gulp.task('test', ['mocha', 'protractor']);
gulp.task('default', ['lint', 'test']);