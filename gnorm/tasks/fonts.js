'use strict'

const gulp = require('gulp')
const ttf2woff2 = require('gulp-ttf2woff2')
const ttf2woff = require('gulp-ttf2woff')
const config = require('../config')

gulp.task('fonts', function() {
  gulp.src([config.app + '/fonts/**/*.ttf'])
    .pipe(ttf2woff2())
    .pipe(ttf2woff())
    .pipe(gulp.dest(config.app + '/fonts/'))
})
