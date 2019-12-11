'use strict';

module.exports = ($el) => {
  require.ensure([], (require) => {
    let Module = require('./workSection.main');
    new Module($el);
  });
};
