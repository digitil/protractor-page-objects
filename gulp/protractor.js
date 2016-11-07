const gulp = require('gulp');
const gls = require('gulp-live-server');
const protractor = require('gulp-angular-protractor');

let server;

gulp.task('serve-testapp', () => {
    server = gls([gls.script, 'testapp', 8881], undefined, false);
    server.start();
});

function runProtractor(config) {
    return gulp.src(['test/integration/*.spec.js'])
        .pipe(protractor(config))
        .on('end', () => {
            server.stop();
        })
        .on('error', e => {
            server.stop();
            throw e;
        });
}

gulp.task('protractor', ['serve-testapp'], () => {
    const config = {
        configFile: 'test/integration/conf.js',
        autoStartStopServer: true,
        debug: false
    };

    return runProtractor(config);
});

gulp.task('protractor-ci', ['serve-testapp'], () => {
    const config = {
        configFile: 'test/integration/conf.ci.js',
        autoStartStopServer: true,
        debug: false
    };

    return runProtractor(config);
});