'use strict';

module.exports = ($el) => {
  require.ensure([], (require) => {
    let Module = require('./musicSection.main');
    new Module($el);
  });
};
