const path        = require('path');
const webpack     = require('webpack');
const __OUTPUT__  = 'dist';


const config = {

  context: __dirname,

  entry: {
    index: [
      './index.js'
    ]
  },

  output: {
    path: path.join(__dirname, __OUTPUT__),
    publicPath: '/',
    filename: '[name].js',
    library: 'react-outerclick',
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
      test: /\.(js|jsx)$/,
      exclude: /(node_modules)/,
      loader: 'babel',
      query: {
        plugins: ['transform-decorators-legacy'],
        presets: ['react', 'es2015', 'stage-0']
      }
    }]
  },

  devServer: {
    contentBase: path.join(__dirname, 'example'),
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: true,
    staticOptions: {

    },
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ],

  devtool: 'source-map',

  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};


if (process.env.NODE_ENV === 'development'){
  config.entry.examples = ['./example/index.js'];
  // config.plugins.push(new webpack.optimize.CommonsChunkPlugin('examples', 'examples.js'));
  delete config.entry.index;
  delete config.externals;
}
else {

}

module.exports = config;