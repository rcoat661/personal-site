'use strict';

import $ from 'jquery';
import matchHeight from 'jquery-match-height';

module.exports = class EqualHeight {
  constructor($el) {
    this.$el = $el;
    this.opts = this.$el.data('opts') || {};
    // If you want to handle more complex scenarios, pass data-custom and then pass
    // data-els as a comma delineated list of items you want to have normalized
    if ($el.data('custom')) {
      let arr = this.parseArray($el.data('els'));
      $(window).on('resize', () => {
        let ww = $(window).width();
        if (ww > 600) {
          this.resetHeights(arr);
          this.applyHeights(arr);
        } else if (ww <= 600) {
          this.resetHeights(arr);
        }
      }).resize();
    }


    $(window).on('resize', () => {
      let ww = $(window).width();
    }).resize();

    $(window).on('load', () => {
      if ($(window).width() > 600) {
        this.matchHeight($(this.$el.children()));
      }
      setTimeout(function(){
        $(window).trigger('resize');
      },500);
    });

  }
  applyHeights(arr) {
    arr.map((el) => {
      let $els = this.$el.find(el);
      let heights = this.getHeightArr($els);
      let largest = this.getLargest(heights);
      $els.height(largest);
    });
  }
  getHeightArr(arr) {
    let heights = [];
    $.each(arr, (i, el) => {
      heights.push($(el).height());
    });
    return heights;
  }
  getLargest(arr) {
    return Math.max.apply(null, arr);
  }
  matchHeight($els) {
    $els.matchHeight(this.opts);
  }
  parseArray(arr) {
    return arr.split(',');
  }
  resetHeights(arr) {
    arr.map((el) => {
      this.$el.find(el).removeAttr('style');
    });
  }
};
