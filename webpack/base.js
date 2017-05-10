const path = require('path');
const fs = require('fs');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const getDirectories = filePath => {
  return fs.readdirSync(filePath).filter(file => {
    return fs.statSync(`${filePath}/${file}`).isDirectory();
  });
};

const packages = getDirectories(path.resolve(__dirname, '../client'));

const aliases = packages.reduce( (reducer, name) => {
  reducer[name] = `client/${name}`;
  return reducer;
}, {
  breakpoint: 'node_modules/breakpoint-sass/stylesheets/_breakpoint'
});

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
    alias: aliases,
    modules: [
      path.resolve(__dirname, '..'),
      'node_modules'
    ]
  },
  devtool: 'inline-source-map', // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
  stats: 'errors-only',
  entry: [],
  target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  output: {
    path: path.resolve(__dirname, '../dist'), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      openAnalyzer: false,
      generateStatsFile: true
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        loader: 'url-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff'
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/octet-stream'
        }
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'image/svg+xml'
        }
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.ico$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /(\.scss)$/,
        exclude: /node_modules/,
        use:[
          'style-loader',
          'css-loader?sourceMap',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [ require('autoprefixer') ]
            }
          },
          'sass-loader?sourceMap'
        ]
      },
      {
        test: /(\.css)$/,
        use: [
          'style-loader',
          'css-loader?sourceMap'
        ]
      },
    ]
  },
};
