const path = require('path');

const entry = './src/index.js'
const output = {
  filename: 'react-outerclick.min.js',
  library: 'react-outerclick',
  libraryTarget: 'commonjs2'
}

module.exports = {
  entry,
  output,
  devtool: "source-map",
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
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom'
    }
  }
};
