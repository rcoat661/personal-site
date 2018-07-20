'use strict';

import $ from 'jquery';

module.exports = class Accordion {
  constructor($el) {
    this.$el = $el;
    let accordionUl = $el.siblings('.accordion'),
    activeState = 'active';

    $el.on('click', (e) => {
      e.preventDefault();
      console.log('hit');
      if (this.$el.hasClass(activeState)) {
        this.$el.removeClass(activeState);
        accordionUl.stop(true, true).slideUp(200);
      } else {
        this.$el.addClass(activeState);
        accordionUl.stop(true, true).slideDown(200);
      }
    });

  }
};
