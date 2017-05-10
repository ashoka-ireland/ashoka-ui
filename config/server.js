import * as constants from './constants';

const host = process.env.HOST || '127.0.0.1';
const port = (+process.env.PORT) || 8080;
const server = { host, port };

const assets = { publicPath: '/' };

/* OAuth tooling throws an error in dev mode if OAuth config is not supplied
 * (even though authorisation is ignored in dev mode) so it must be supplied in
 * the base config.
 */
const baseConfig = {
  server,
  assets,
  // Add OAUTH, EMPLOYEES validation here if needed
};

const getEnvConfig = (host, port) => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return require('./production')();
    case 'staging':
      return require('./staging')();
    default:
      return require('./dev')(host, port);
  }
};

const environmentConfig = getEnvConfig(host, port);

module.exports = Object.assign({}, baseConfig, environmentConfig);
