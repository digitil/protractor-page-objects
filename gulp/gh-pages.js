var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var package = require('../package.json');
 
gulp.task('gh-pages', function() {
    var options = {
        push: true
    };

    return gulp.src(['docs', package.name, package.version, '**/*'].join('/'))
        .pipe(ghPages(options));
});