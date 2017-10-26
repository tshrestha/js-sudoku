const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/js/sudoku-ui.js'),
  output: {
    path: path.resolve(__dirname, 'app'),
    filename: 'main.[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules(?!\/webpack-dev-server)/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['app']),
    new ExtractTextPlugin('main.[hash].css'),
    new webpack.optimize.UglifyJsPlugin({sourceMap: true}),
    new HtmlWebpackPlugin({template: 'src/index.html'})
  ],
  devServer: {
    port: 8000,
    contentBase: path.join(__dirname, 'app')
  },
  devtool: 'source-map'
};