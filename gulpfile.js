'use strict';

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

var autoprefixerOptions = {
    browsers: ['last 2 versions'],
    cascade: false
};

// Set the default paths for reusability
var paths = {
    convert: 'public/assets/js/convert.js',
    js: 'public/assets/js',
    sass: 'public/assets/sass/core.scss',
    css: 'public/assets/css'
};


// Styles
gulp.task('sass', function() {
    gulp.src(paths.sass)
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(paths.css))
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(notify({ message: 'YKYM: <%= file.relative %>' }));
});

// Scripts
gulp.task('js', function() {
    gulp.src(paths.convert)
        .pipe(rename('convert.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.js))
        .pipe(notify({ message: 'YKYM: <%= file.relative %>' }));
});

// Default task. This is for when you just type 'gulp' on the command line
gulp.task('default', ['sass', 'js']);
