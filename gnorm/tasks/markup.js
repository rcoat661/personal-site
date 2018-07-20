'use strict'
const gulp = require('gulp')
const include = require('gulp-include')
const config = require('../config').markup

gulp.task('markup', function() {
  return gulp.src(config.src)
    .pipe(include())
    .pipe(gulp.dest(config.dest))
})
