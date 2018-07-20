'use strict';

module.exports = ($el) => {
  require.ensure([], (require) => {
    let Module = require('./headerScroll.main');
    new Module($el);
  });
};
