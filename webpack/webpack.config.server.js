var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  target: 'node',
  entry: [
    './lib/core-js-no-number',
    'regenerator/runtime',
    '../app/main_server',
  ],
  output: {
    path: path.join(__dirname, 'assets'),
    filename: 'server.bundle.js',
    publicPath: '/assets/',
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx'],
    root: path.join(__dirname, '../app'),
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules|lib/,
        query: {
            presets: ['react', 'es2015', 'stage-0'],
            plugins: [
              // https://github.com/babel/babel-loader#babel-is-injecting-helpers-into-each-file-and-bloating-my-code
              'transform-runtime',
              'transform-decorators-legacy'
            ],
        }
      },
      {
        test: /\.json?$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: 'null-loader'
      },
    ],
  },
};
