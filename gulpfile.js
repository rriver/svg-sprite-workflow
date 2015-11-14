/**
Gulp to:
1. Make an SVG sprite from multiple SVG files
2. Make fallback PNG images from the SVG files
**/

'use strict';

// Load modules
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();


// Create SVG sprite
gulp.task('svg', function () {
  gulp.src('svg/icons/*.svg')
    .pipe($.svgstore({ inlineSvg: true }))
    .pipe($.cheerio({
      run: function ($, file) {
          $('svg').addClass('hide');
          $('[fill]').removeAttr('fill');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(gulp.dest('svg'));
});

gulp.task('svg2png', function () {
  gulp.src('svg/icons/*.svg')
    .pipe($.svg2png(3))
    .pipe($.rename({ prefix: "icons.svg." }))
    .pipe($.imagemin())
    .pipe(gulp.dest('svg'));
});


// Default task to be run with `gulp`
gulp.task('default', ['svg','svg2png'], function () {
});