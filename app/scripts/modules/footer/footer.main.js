'use strict';

import $ from 'jquery';

module.exports = class Footer {
  constructor($el) {
    this.$el = $el;
    let yearEl = $el.find('#year');
    let year = new Date().getFullYear();

    yearEl.text(year);

  }
};
