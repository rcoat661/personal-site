'use strict'

const gulp       = require('gulp')
const changed    = require('gulp-changed')
const config     = require('../config').images
const imagemin   = require('gulp-imagemin')

gulp.task('images', function() {
  return gulp.src(config.src)
    .pipe(changed(config.dest)) // Ignore unchanged files
    .pipe(imagemin()) // Optimize
    .pipe(gulp.dest(config.dest))
})
