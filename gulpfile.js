// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename");

// Set the default paths for reusability
var paths = {
    convert: 'public/assets/js/convert.js',
    js: 'public/assets/js',
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

// Scripts
gulp.task('js', function() {
    return gulp.src(paths.convert)
        .pipe(rename('convert.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.js))
        .pipe(notify({ message: 'YKYM: <%= file.relative %>' }));
});

// Watch files for changes and do something
gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.convert, ['js']);
});

// Default task. This is for when you just type 'gulp' on the command line
gulp.task('default', ['sass', 'js']);
