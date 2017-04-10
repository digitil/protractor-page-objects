const gulp = require('gulp')
const coveralls = require('gulp-coveralls')
const path = require('path')

gulp.task('coveralls', () => {
  return gulp.src(path.join(__dirname, '../coverage/lcov.info'))
    .pipe(coveralls())
})
