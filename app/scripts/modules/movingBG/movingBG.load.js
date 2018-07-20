'use strict';

module.exports = ($el) => {
  require.ensure([], (require) => {
    let Module = require('./movingBG.main');
    new Module($el);
  });
};
