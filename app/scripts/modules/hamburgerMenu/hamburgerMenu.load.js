'use strict';

module.exports = ($el) => {
  require.ensure([], (require) => {
    let Module = require('./hamburgerMenu.main');
    new Module($el);
  });
};
