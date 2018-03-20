const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HTMLPlugin = require('html-webpack-plugin');

const prodPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.AggressiveMergingPlugin()
];

module.exports = {
  entry: __dirname + '/src/js/index.js',
  output: {
    path: __dirname + '/build',
    filename: 'js/transformed.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: 'env',
          plugins: ['inferno', 'transform-class-properties', 'transform-object-rest-spread']
        }
      }]
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({ use: "css-loader" })
    }]
  },
  plugins: [
    new HTMLPlugin({
      template: __dirname + '/src/html/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new ExtractTextPlugin('css/style.css'),
  ].concat(process.env.NODE_ENV === 'production' ? prodPlugins : []) 
};
