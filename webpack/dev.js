import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config = require('./base');

export default Object.assign({}, config, {
  entry: [
    'babel-polyfill',
    // must be first entry to properly set public path
    path.resolve(__dirname, '../client/webpack-public-path'),
    'webpack-hot-middleware/client?reload=true',
    path.resolve(__dirname, '../client/index.js') // Defining path seems necessary for this to work consistently on Windows machines.
  ],

  plugins: [
    ...config.plugins,
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
      __DEV__: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({     // Create HTML file that includes references to bundled CSS and JS.
      template: 'client/index.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      inject: true
    })
  ]
});
