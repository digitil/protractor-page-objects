const gulp = require('gulp')
const ghPages = require('gulp-gh-pages')
const { name, version, repository } = require('../package.json')

function modifyForTravis (options) {
  const remoteUrl = repository.url.split(/https?:\/\//)[1]

  if (process.env.TRAVIS) {
    options.remoteUrl = `https://${process.env.GITHUB_TOKEN}@${remoteUrl}`
  }
}

gulp.task('gh-pages', () => {
  const options = {
    push: true
  }

  modifyForTravis(options)

  return gulp.src(['docs', name, version, '**/*'].join('/'))
        .pipe(ghPages(options))
})
