'use strict'

const del = require('del')
const gulp = require('gulp')

gulp.task('clean', function() {
  return del([
    'build/**/*'
  ])
})
