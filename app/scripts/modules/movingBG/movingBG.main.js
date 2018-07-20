'use strict';

import $ from 'jquery';

module.exports = class movingBG {
  constructor($el) {

    function moveBackground() {
      let parallax = document.querySelectorAll('.hero--background'),
      speed = 0.5;
      [].slice.call(parallax).forEach(function(el,i){

        let windowYOffset = window.pageYOffset,
            elBackgrounPos = -(windowYOffset * speed) + 'px';

        $el.css('transform', 'translateY(' + elBackgrounPos + ')');

      });
    }

    if($(window).width() >= 1024){
      $(window).on('scroll', function(){
        moveBackground();
      });
    }

    $(window).on('resize', function(){
      if($(window).width() >= 1024){
        $(window).on('scroll', function(){
          moveBackground();
        });
      }
      else {
        $el.css('transform', 'translateY(0)');
        $(window).on('scroll', function(){
          $el.css('transform', 'translateY(0)');
        });
      }
    });

  }
};
