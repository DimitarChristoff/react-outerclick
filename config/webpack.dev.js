const path            = require('path')
const webpack         = require('webpack')
const pkg             = require('../package.json')

const __INPUT__       = path.join(__dirname, '..')
const __EXAMPLE__     = path.join(__dirname, '..', 'example')

module.exports = {

  devtool: 'eval-source-map',

  context: path.join(__dirname),

  contentBase: path.join(__dirname),

  entry: {
    examples: [path.join(__INPUT__, 'index.js')],
    vendor: [
      'react',
      'react-dom'
    ]
  },

  output: {
    filename: '[name].js',
    publicPath: '/'
  },

  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules)/,
      loader: 'babel',
      query: {
        plugins: [
          'transform-decorators-legacy'
        ],
        presets: ['react-hmre', 'react', 'es2015', 'stage-0']
      }
    }]
  },

  devServer: {
    contentBase: __EXAMPLE__,
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 3000,
    hot: true,
    quiet: false,
    staticOptions: {},
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"'
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
  ],

  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}
