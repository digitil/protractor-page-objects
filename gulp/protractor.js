var gulp = require('gulp');
var protractor = require('gulp-angular-protractor');

gulp.task('protractor', function () {
    var config = {
            configFile: './test/integration/conf.js',
            autoStartStopServer: true,
            debug: true
        };

    return gulp.src(['./test/integration/*.spec.js'])
        .pipe(protractor(config))
        .on('error', function(e) { throw e });
});