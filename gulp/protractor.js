var gulp = require('gulp');
var gls = require('gulp-live-server');
var protractor = require('gulp-angular-protractor');

var server;

gulp.task('serve-testapp', function() {
    server = gls([gls.script, 'testapp', 8888], undefined, false);
    server.start();
});

gulp.task('protractor', ['serve-testapp'], function () {
    var config = {
            configFile: 'test/integration/conf.js',
            autoStartStopServer: true,
            debug: true
        };

    return gulp.src(['test/integration/*.spec.js'])
        .pipe(protractor(config))
        .on('end', function () {
            server.stop();
        })
        .on('error', function (e) {
            server.stop();
            throw e;
        });
});