const path                = require('path')
const webpack             = require('webpack')
const pkg                 = require('../package.json')

const __OUTPUT__          = path.join(__dirname, '..', 'dist')
const __INPUT__           = path.join(__dirname, '..')
const __COMPONENT_NAME__  = 'react-outerclick'

module.exports = {

  devtool: 'source-map',

  debug: false,

  context: __dirname,

  entry: {
    index: [
      path.join(__INPUT__, 'index.js'),
    ]
  },

  output: {
    path: __OUTPUT__,
    publicPath: './',
    filename: `${__COMPONENT_NAME__}.min.js`,
    library: 'react-outerclick',
    libraryTarget: 'umd'
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
  },

  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|r4p)/,
      loader: 'babel',
      query: {
        plugins: ['transform-decorators-legacy'],
        presets: ['react', 'es2015', 'stage-0']
      }
    }]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false, //prod
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      }, //prod
      compress: {
        screw_ie8: true
      }, //prod
      comments: false //prod
    })
  ],

  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}
