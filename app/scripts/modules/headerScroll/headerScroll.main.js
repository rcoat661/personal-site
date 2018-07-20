'use strict';

import $ from 'jquery';
import Headroom from 'headroom.js';
import Enquire from 'enquire.js';

module.exports = class headerScroll {
  constructor($el) {
    this.$el = $el;
    this.settings = {
      onPin: () => {
        $('body').addClass('headroom-is-pinned');
      },
      onUnpin: () => {
        $('body').removeClass('headroom-is-pinned');
      },
      'offset': 100,
      'tolerance': 1,
      'classes': {
        'initial': 'animated',
        'pinned': 'slideDown',
        'unpinned': 'slideUp'
      }
    };

    this.settingsMobile = {
      onPin: () => {
        $('body').addClass('headroom-is-pinned');
      },
      onUnpin: () => {
        $('body').removeClass('headroom-is-pinned');
      },
      'offset': 30,
      'tolerance': 1,
      'classes': {
        'initial': 'animated',
        'pinned': 'slideDown',
        'unpinned': 'slideUp'
      }
    };

    $(window).on('load', () => {
      $('body').addClass('headroom-is-pinned');
      $('.hamburger-inner').addClass('slide-transition');
    });

    this.setupHeadroom();
  }

  setupHeadroom() {
    Enquire.register('screen and (max-width:1025px)', {
      match: () => {
        this.headroom = new Headroom(this.$el[0], this.settingsMobile);
        this.headroom.init();
      },
      unmatch: () => {
        this.headroom = new Headroom(this.$el[0], this.settings);
        this.headroom.init();
      },
      setup: () => {
        this.headroom = new Headroom(this.$el[0], this.settings);
        this.headroom.init();
      }
    });
  }
};
