var jshint = require('gulp-jshint');
var gulp   = require('gulp');

gulp.task('jshint', function () {
    var javascript = ['lib', 'test']
        .map(function (dir) {
            return dir + '/**/*.js';
        });

    return gulp.src(javascript)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});