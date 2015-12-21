const gulp = require('gulp');
const jscs = require('gulp-jscs');
 
gulp.task('jscs', function () {
    var options = {
        // TODO: with fix=true, 'nestled' comments like the one's used for documenting overloaded functions get broken (e.g. Component.$$component)
        fix: false
    };

    return gulp.src('lib/**/*.js')
        .pipe(jscs(options))
        .pipe(jscs.reporter())
        .pipe(jscs.reporter('fail'))
        .pipe(gulp.dest('lib'));
});