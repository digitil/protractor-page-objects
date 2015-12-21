var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var pkg = require('../package.json');

function modifyForTravis(options) {
    var remoteUrl = pkg.repository.url.split(/https?:\/\//)[1];

    if (process.env.TRAVIS) {
        options.remoteUrl = 'https://' + process.env.GITHUB_TOKEN + '@' + remoteUrl;
    }
}

gulp.task('gh-pages', function() {
    var options = {
        push: true
    };

    modifyForTravis(options);

    return gulp.src(['docs', pkg.name, pkg.version, '**/*'].join('/'))
        .pipe(ghPages(options));
});