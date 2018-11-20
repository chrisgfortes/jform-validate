const Package = require('../package.json');
const path = require('path');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    library: Package.alias,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    filename: '[name].js',
    path: path.resolve('./dist'),
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader',
    }],
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['index'],
    }),
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
    ]),
  ],
};
