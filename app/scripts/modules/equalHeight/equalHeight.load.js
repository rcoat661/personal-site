'use strict';

module.exports = ($el) => {
  require.ensure([], (require) => {
    let Module = require('./equalHeight.main');
    new Module($el);
  });
};
