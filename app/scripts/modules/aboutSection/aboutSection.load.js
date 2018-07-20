'use strict';

module.exports = ($el) => {
  require.ensure([], (require) => {
    let Module = require('./aboutSection.main');
    new Module($el);
  });
};
