const jshint = require('gulp-jshint');
const gulp   = require('gulp');

gulp.task('jshint', () => {
    const javascript = ['lib', 'test']
        .map(dir => `${dir}/**/*.js`);

    return gulp.src(javascript)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});