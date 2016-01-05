var webpack = require('webpack');
var config = require('./webpack.config.client');
var _ = require('lodash');
var devProps = require('./devProps');

var config = module.exports = _.assign(_.clone(config), {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?' + devProps.baseUrl,
    'webpack/hot/only-dev-server',
  ].concat(config.entry),
  output: _.assign(_.clone(config.output), {
    publicPath: devProps.baseUrl + '/assets/',
    pathinfo: true,
    // crossOriginLoading is important since we are running
    // webpack-dev-server from a different port than Meteor
    crossOriginLoading: 'anonymous',
  }),
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules|lib/,
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          cacheDirectory: true,
          plugins: [
            'transform-react-display-name',
            'transform-runtime',
            'transform-decorators-legacy',
            ['react-transform', {
              'transforms': [{
                'transform': 'react-transform-hmr',
                'imports': ['react'],
                // this is important for Webpack HMR:
                'locals': ['module']
              }, {
                'transform': 'react-transform-catch-errors',
                // the second import is the React component to render error
                // (it can be a local path too, like './src/ErrorReporter')
                'imports': ['react', 'redbox-react']
              }]
            }]
          ]
        },
      },
      {
        test: /\.json?$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]',
        exclude: /node_modules|lib/
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]!sass-loader',
        exclude: /node_modules|lib/,
      }
    ],
  },
  plugins: (config.plugins || []).concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ]),
  devServer: {
    publicPath: devProps.baseUrl + '/assets/',
    host: devProps.host,
    hot: true,
    historyApiFallback: true,
    contentBase: devProps.contentBase,
    port: devProps.webpackPort,
  }
});
