'use strict';

import $ from 'jquery';

module.exports = class hamburgerMenu {
  constructor($el) {
    this.$el = $el;
    this.$html = $('html');
    this.$hamburger = this.$el.find('.global-header__hamburger');
    this.$hamburgerClose = this.$el.find('nav a.exit');
    this.$nav = this.$el.find('nav[role="navigation"]');
    this.$headroom = $('.sticky-container');
    this.$topNav = this.$el.find('.top-nav');
    this.$innerNav = this.$el.find('.global-header__nav');
    this.$main = this.$el.next('main');
    this.$hamburgerInner = this.$el.find('.hamburger-inner');

    this.$hamburger.on('click', (e) => {
      e.preventDefault();
      if ($(e.currentTarget).hasClass('is-active')) {
        this.closeNav();
        setTimeout(function(){
          $('main').removeClass('nav-is-open');
          $('.hamburger-inner').addClass('slide-transition');
        },500);
      } else {
        this.openNav();
      }
    });
  }

  openNav() {
    this.$el.addClass('is-active');
    this.$main.addClass('nav-is-open');
    this.$hamburger.addClass('is-active');
    this.$topNav.addClass('is-active');
    this.$nav.addClass('is-active');
    this.$hamburgerInner.removeClass('slide-transition');
  }

  closeNav() {
    this.$el.removeClass('is-active');
    this.$nav.removeClass('is-active');
    this.$hamburger.removeClass('is-active');
    this.$topNav.removeClass('is-active');
  }

};
