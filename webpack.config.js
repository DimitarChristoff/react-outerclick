const path        = require('path');
const webpack     = require('webpack');
const __OUTPUT__  = 'dist';


module.exports = {
  entry: {
    index: [
      './index.js'
    ]
  },
  output: {
    path: path.join(__dirname, __OUTPUT__),
    publicPath: '/',
    filename: '[name].js',
    library: 'ReactOuterclick',
    libraryTarget: 'umd'
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  },
  module: {
    loaders: [{
      test: /\.{js,jsx}?$/,
      exclude: /(node_modules)/,
      loader: 'babel'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};