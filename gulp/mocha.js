var gulp = require('gulp');
var mocha = require('gulp-mocha');
var cover = require('gulp-coverage');
var coveralls = require('gulp-coveralls');

var filesInLib = 'lib/**/*.js';
var filesInTest = 'test/unit/**/*.js';
var filesToInstrument = ['lib/**/*.js', '!lib/component/dsl.js'];

function mochaErrorHandler(error) {
    console.log(error.toString());
    this.emit('end');
}

gulp.task('mocha', function() {
    return gulp.src(filesInTest, { read: false })
        .pipe(mocha())
        .on("error", mochaErrorHandler);
});

gulp.task('mocha-coverage', function() {
    var instrumentation = {
        pattern: filesToInstrument
    };

    return gulp.src(filesInTest, { read: false })
        .pipe(cover.instrument(instrumentation))
        .pipe(mocha())
        .on("error", mochaErrorHandler)
        .pipe(cover.gather())
        .pipe(cover.format('html'))
        .pipe(gulp.dest('reports'));
});

gulp.task('mocha-ci', function() {
    var instrumentation = {
        pattern: filesToInstrument
    };

    return gulp.src(filesInTest, { read: false })
        .pipe(cover.instrument(instrumentation))
        .pipe(mocha())
        .on("error", mochaErrorHandler)
        .pipe(cover.gather())
        .pipe(cover.format({ reporter: 'lcov' }))
        .pipe(coveralls());
});

gulp.task('watch-mocha', ['mocha'], function() {
    gulp.watch([filesInLib, filesInTest], ['mocha']);
});

gulp.task('watch-coverage', ['mocha-coverage'], function() {
    gulp.watch([filesInLib, filesInTest], ['mocha-coverage']);
});