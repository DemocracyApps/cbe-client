var path = require('path');
var webpack = require('webpack');

var definePlugin = new webpack.DefinePlugin({
  __RUNMODE__: JSON.stringify(process.env.NODE_ENV)
});

module.exports = {
  //devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    definePlugin
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.css?$/,
      loaders: ['style', 'raw'],
      include: __dirname
    }]
  }
};
