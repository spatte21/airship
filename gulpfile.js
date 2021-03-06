// include gulp and plug-ins
var gulp = require('gulp')
  , mocha = require('gulp-mocha')
  , jshint = require('gulp-jshint');

var paths = {
  server: './server/**/*.js',
  client: './public/app/**/*.js',
  test: './test/**/*.js'
};

// jshint
gulp.task('lint', function() {
  return gulp.src([paths.server, paths.client])
    .pipe(jshint({ laxcomma: true }))
    .pipe(jshint.reporter('default'))
    // TODO - see
    .on('error', function(error) {
      console.log(error);
      process.exit(1);
    });
});

// mocha
gulp.task('mocha', function() {
  return gulp.src(paths.test, { read: false})
    .pipe(mocha({
      reporter: 'spec'
    }))
    .once('end', function() {
      process.exit();
    })
    .on('error', function(error) {
      console.log(error);
    });
});

// Default does everything
gulp.task('default', ['lint', 'mocha'], function() {
});