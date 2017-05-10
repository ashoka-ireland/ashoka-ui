const config = require('./base');

const resolve = Object.assign({}, config.resolve);
resolve.alias.sinon = 'client/spec/utils/zinon';

module.exports = {
  resolve: resolve,
  module: config.module
};
