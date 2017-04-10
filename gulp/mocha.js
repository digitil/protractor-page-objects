const gulp = require('gulp')
const mocha = require('gulp-mocha')
const istanbul = require('gulp-istanbul')

const sourceFiles = 'src/**/*.js'
const testFiles = 'test/unit/**/*.js'
const filesToInstrument = ['src/**/*.js', '!src/component/dsl.js']
let failOnError = true

function mochaErrorHandler (error) {
  console.error(error.toString())
  if (failOnError) {
    process.exit(1)
  }
  this.emit('end')
}

gulp.task('istanbul', () => {
  return gulp.src(filesToInstrument)
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
})

gulp.task('mocha', ['istanbul'], () => {
  return gulp.src(testFiles, { read: false })
    .pipe(mocha())
    .on('error', mochaErrorHandler)
    .pipe(istanbul.writeReports({ reporters: ['text', 'lcovonly'] }))
})

gulp.task('watch-mocha', ['mocha'], () => {
  failOnError = false
  gulp.watch([sourceFiles, testFiles], ['mocha'])
})
