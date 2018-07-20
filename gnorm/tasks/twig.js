'use strict'
const gulp = require('gulp')
const data = require('gulp-data')
const twig = require('gulp-twig')
const path = require('path')
const config = require('../config').twig

gulp.task('twig', function () {
    'use strict'
    return gulp.src(config.src)
        .pipe(data(function(file){
          return require(config.data + 'global.json')
        }))
        .pipe(data(function(file){
          return require(config.data + path.basename(file.path, '.twig') + '.json')
        }))
        .pipe(twig({
          onError: function(){
            //Emits error without killing the server
          }
        }))
        .pipe(gulp.dest(config.dest))
})
