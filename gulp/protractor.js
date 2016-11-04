var gulp = require('gulp');
var gls = require('gulp-live-server');
var protractor = require('gulp-angular-protractor');

var server;

gulp.task('serve-testapp', function() {
    server = gls([gls.script, 'testapp', 8881], undefined, false);
    server.start();
});

function runProtractor(config) {
    return gulp.src(['test/integration/*.spec.js'])
        .pipe(protractor(config))
        .on('end', function () {
            server.stop();
        })
        .on('error', function (e) {
            server.stop();
            throw e;
        });
}

gulp.task('protractor', ['serve-testapp'], function () {
    var config = {
            configFile: 'test/integration/conf.js',
            autoStartStopServer: true,
            debug: false
        };

    return runProtractor(config);
});

gulp.task('protractor-ci', ['serve-testapp'], function () {
    var config = {
            configFile: 'test/integration/conf.ci.js',
            autoStartStopServer: true,
            debug: false
        };

    return runProtractor(config);
});