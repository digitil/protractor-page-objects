const gulp = require('gulp');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');
const coveralls = require('gulp-coveralls');

const filesInLib = 'lib/**/*.js';
const filesInTest = 'test/unit/**/*.js';
const filesToInstrument = ['lib/**/*.js', '!lib/component/dsl.js'];

function mochaErrorHandler(error) {
    console.log(error.toString());
    this.emit('end');
}

gulp.task('mocha', () => {
    return gulp.src(filesInTest, { read: false })
        .pipe(mocha())
        .on("error", mochaErrorHandler);
});

gulp.task('istanbul:instrument', () => {
  return gulp.src(filesToInstrument)
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('mocha-coverage', ['istanbul:instrument'], () => {
    return gulp.src(filesInTest, { read: false })
        .pipe(mocha())
        .on("error", mochaErrorHandler)
        .pipe(istanbul.writeReports({ reporters: ['text'] }));
});

gulp.task('mocha-ci', ['istanbul:instrument'], () => {
    return gulp.src(filesInTest, { read: false })
        .pipe(mocha())
        .on("error", mochaErrorHandler)
        .pipe(istanbul.writeReports({ reporters: ['lcovonly'] }))
        .pipe(coveralls());
});

gulp.task('watch-mocha', ['mocha'], () => {
    gulp.watch([filesInLib, filesInTest], ['mocha']);
});

gulp.task('watch-coverage', ['mocha-coverage'], () => {
    gulp.watch([filesInLib, filesInTest], ['mocha-coverage']);
});
