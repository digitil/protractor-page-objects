const gulp = require('gulp');
const jscs = require('gulp-jscs');
 
gulp.task('jscs', () => {
    const options = {
        // NOTE: with fix=true, 'nestled' comments like those used for documenting overloaded functions are mangled (e.g. Component.$$component)
        fix: false
    };

    return gulp.src('lib/**/*.js')
        .pipe(jscs(options))
        .pipe(jscs.reporter())
        .pipe(jscs.reporter('fail'))
        .pipe(gulp.dest('lib'));
});