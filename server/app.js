import history from 'connect-history-api-fallback';

const express = require('express');
const path = require('path');

module.exports = (options = {}) => {
  const app = express();

  if (options.runWebpackMiddleware) {
    const webpack =  require('webpack');
    const config = require('../webpack.config').default;
    const bundler = webpack(config);

    app.use(history());

    console.log('Enabling webpack dev middleware.');
    app.use(require('webpack-dev-middleware')(bundler, {
      // Dev middleware can't access config, so we provide publicPath
      publicPath: config.output.publicPath,
      historyApiFallback: true,
      // These settings suppress noisy webpack output so only errors are displayed to the console.
      noInfo: false,
      quiet: false,
      stats: {
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
      }
    }));

    console.log('Enabling Webpack Hot Module Replacement (HMR).');
    app.use(require('webpack-hot-middleware')(bundler));
  }

  app.use(express.static(path.resolve(__dirname, '../dist')));

  app.get('/healthcheck', (req, res) => {
    res.status(200).send('OK');
  });

  console.log('Redirecting...');
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });

  return app;
};
