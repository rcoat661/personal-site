'use strict';

import $ from 'jquery';

module.exports = {
  init: function() {
    $('[data-module]').each((i, v) => {
      let name = $(v).data('module');
      let module = this.modules[name]($(v));
    });
  },
  modules: {
    aboutSection: require('./aboutSection/aboutSection.load'),
    accordion: require('./accordion/accordion.load'),
    equalHeight: require('./equalHeight/equalHeight.load'),
    footer: require('./footer/footer.load'),
    hamburgerMenu: require('./hamburgerMenu/hamburgerMenu.load'),
    headerScroll: require('./headerScroll/headerScroll.load'),
    movingBG: require('./movingBG/movingBG.load'),
    musicSection: require('./musicSection/musicSection.load'),
    scrollSmooth: require('./scrollSmooth/scrollSmooth.load'),
    workSection: require('./workSection/workSection.load')
  }

};