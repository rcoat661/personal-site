'use strict';

module.exports = ($el) => {
  require.ensure([], (require) => {
    let Module = require('./accordion.main');
    new Module($el);
  });
};
