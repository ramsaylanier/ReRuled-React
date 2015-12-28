var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: [
    './lib/core-js-no-number',
    'regenerator/runtime',
    '../app/main_client',
  ],
  output: {
    path: path.join(__dirname, 'assets'),
    filename: 'client.bundle.js',
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
           presets: ['react' ,'es2015', 'stage-0'],
           plugins: [
             // https://github.com/babel/babel-loader#babel-is-injecting-helpers-into-each-file-and-bloating-my-code
             'transform-runtime',
             'react-transform',
             'transform-decorators-legacy',
           ],
       }
      },
      {
        test: /\.json?$/,
        loader: 'json-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]'
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]!sass-loader'
      }
    ],
  },
  plugins: [
    new webpack.PrefetchPlugin("react"),
    new webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment")
  ]
};
