// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    notify = require('gulp-notify');

// Set the default paths for reusability
var paths = {
  sass: 'public/assets/sass/*.scss',
  css: 'public/assets/css'
};

// Styles
gulp.task('sass', function() {
  return gulp.src(paths.sass)
    .pipe(sass({ style: 'compressed' }))
    .pipe(gulp.dest(paths.css))
    .pipe(notify({ message: 'YKYM: <%= file.relative %>' }));
});

// Watch files for changes and do something
gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

// Default task. This is for when you just type 'gulp' on the command line
gulp.task('default', ['sass']);
