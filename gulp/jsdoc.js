var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util');
var jsdoc2md = require('gulp-jsdoc-to-markdown');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
 
gulp.task('jsdoc', function () {
    var sources = [
        'lib/**/*.js'
    ];

    return gulp.src(sources)
        .pipe(concat('api.md'))
        .pipe(jsdoc2md())
        .on('error', function (err) { gutil.log(gutil.colors.red('jsdoc2md failed'), err.message); })
        .pipe(rename(function (path) { path.extname = '.md'; }))
        .pipe(gulp.dest('docs'));
});