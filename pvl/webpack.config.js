const webpack = require('webpack');
const path = require('path');
 
module.exports = {
    mode: 'development',
    watch: true,
  entry: ['babel-polyfill', path.resolve(__dirname, './src/jsx/index.js')],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    hot: true,
  },
};