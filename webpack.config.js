const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = options => {
  const env = process.env.NODE_ENV;
  
  return {
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
          use: [CssExtractPlugin.loader, 'css-loader']
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['app']),
      new CssExtractPlugin({filename: 'main.[hash].css'}),
      new HtmlWebpackPlugin({ template: 'src/index.html' })
    ],
    optimization: {
      minimize: true
    },
    devServer: {
      port: 8000,
      contentBase: path.join(__dirname, 'app')
    },
    devtool: 'inline-source-map'
  }
}