'use strict';

module.exports = ($el) => {
  require.ensure([], (require) => {
    let Module = require('./scrollSmooth.main');
    new Module($el);
  });
};
