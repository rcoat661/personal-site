'use strict';

import $ from 'jquery';
import smoothScroll from 'jquery-smooth-scroll';

module.exports = class ScrollSmooth {
  constructor($el) {
    this.$el = $($el);
    this.$el.smoothScroll({
      speed: 500
    });
  }
};
