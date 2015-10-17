const gulp = require('gulp');
const jscs = require('gulp-jscs');
 
gulp.task('jscs', function () {
    var options = {
        fix: true
    };

    return gulp.src('lib/*.js')
        .pipe(jscs(options))
        .pipe(jscs.reporter())
        .pipe(jscs.reporter('fail'))
        .pipe(gulp.dest('lib'));
});