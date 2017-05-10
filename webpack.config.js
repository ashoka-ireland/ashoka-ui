function config() {
  switch (process.env.NODE_ENV) {
    case 'production':
      return 'prod';
    case 'test':
      return 'test';
    default:
      return 'dev';
  }
}

module.exports = require(`./webpack/${config()}.js`);
