const gulp = require('gulp')
const mocha = require('gulp-mocha')
const istanbul = require('gulp-istanbul')
const coveralls = require('gulp-coveralls')
const path = require('path')

const sourceFiles = 'src/**/*.js'
const testFiles = 'test/unit/**/*.js'
const filesToInstrument = ['src/**/*.js', '!src/component/dsl.js']

function mochaErrorHandler (error) {
  console.log(error.toString())
  this.emit('end')
}

gulp.task('mocha', () => {
  return gulp.src(testFiles, { read: false })
        .pipe(mocha())
        .on('error', mochaErrorHandler)
})

gulp.task('istanbul:instrument', () => {
  return gulp.src(filesToInstrument)
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
})

gulp.task('mocha-coverage', ['istanbul:instrument'], () => {
  return gulp.src(testFiles, { read: false })
        .pipe(mocha())
        .on('error', mochaErrorHandler)
        .pipe(istanbul.writeReports({ reporters: ['text', 'lcovonly'] }))
})

gulp.task('mocha-ci', ['mocha-coverage'], () => {
  return gulp.src(path.join(__dirname, 'coverage/lcov.info'))
        .pipe(coveralls())
})

gulp.task('watch-mocha', ['mocha'], () => {
  gulp.watch([sourceFiles, testFiles], ['mocha'])
})

gulp.task('watch-coverage', ['mocha-coverage'], () => {
  gulp.watch([sourceFiles, testFiles], ['mocha-coverage'])
})
