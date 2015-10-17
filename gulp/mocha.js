var gulp = require('gulp');
var mocha = require('gulp-mocha');
var cover = require('gulp-coverage');

gulp.task('mocha', function () {
    var coverageConfig = {pattern: ['./lib/*.js']};

    return gulp.src('./test/unit/*.js', { read: false })
        .pipe(cover.instrument(coverageConfig))
        .pipe(mocha())
        .pipe(cover.gather())
        .pipe(cover.format())
        .pipe(gulp.dest('reports'));
});