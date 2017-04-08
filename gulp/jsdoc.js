const gulp = require('gulp')
const { exec } = require('child_process')
const path = require('path')
const gls = require('gulp-live-server')
const { name, version } = require('../package.json')

gulp.task('jsdoc', callback => {
  const jsdoc = path.resolve(__dirname, '../node_modules/.bin/jsdoc')
  const command = [
    jsdoc,
    '--package package.json',
    '--configure docs/conf.json',
    '--destination docs',
    '--readme docs/readme.md',
    '--tutorials docs/tutorials'
  ].join(' ')

  exec(command, error => {
    if (error) {
      return callback(error)
    }
    callback()
  })
})

gulp.task('serve-docs', ['jsdoc'], () => {
  const serverPath = [
    gls.script,
    ['docs', name, version].join('/'),
    8882
  ]
  const server = gls(serverPath, undefined, false)
  server.start()
})

gulp.task('watch-jsdoc', ['serve-docs'], () => {
  gulp.watch([
    'lib/**/*.js',
    'docs/**/*.md'
  ], ['jsdoc'])
})
