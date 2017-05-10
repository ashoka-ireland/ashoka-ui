/* eslint-disable no-console */

const http = require('http');
const config = require('../config/server');
const appFactory = require('../server/app');
const app = appFactory({runWebpackMiddleware: true});

const { server: serverConfig } = config;

const serverStateLogger = (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info('==> ✅  Server is running, talking to API server on %s.', serverConfig.port);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', serverConfig.host, serverConfig.port);
  }
};

http.createServer(app)
  .listen(serverConfig.port, serverStateLogger);
