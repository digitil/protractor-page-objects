const gulp = require('gulp')
const sequence = require('run-sequence')

require('./gulp')

gulp.task('test', ['mocha', 'protractor'])

gulp.task('ci', () => {
  sequence('mocha', 'protractor-ci', 'coveralls')
})

gulp.task('publish', () => {
  sequence('jsdoc', 'gh-pages')
})
