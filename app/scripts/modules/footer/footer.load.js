'use strict';

module.exports = ($el) => {
  require.ensure([], (require) => {
    let Module = require('./footer.main');
    new Module($el);
  });
};
