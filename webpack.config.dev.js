const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './example/index.html',
  filename: 'index.html'
});

const entry = './example/index.js'

module.exports = {
  devtool: 'sourcemap',
  entry,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  devServer: {
    contentBase: './example',
    compress: true,
    port: 9000
  },
  plugins: [htmlPlugin]
};