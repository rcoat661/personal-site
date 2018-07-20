'use strict'

const browserSync = require('browser-sync')
const config = require('../config.js').browserSync
const gulp = require('gulp')

gulp.task('browserSync', ['dev'], function() {
  browserSync(config)
})

gulp.task('browserSync:dist', ['build'], function() {
  browserSync(config)
})
