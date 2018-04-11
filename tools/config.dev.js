const CircularDependencyPlugin = require('circular-dependency-plugin');
const merge = require('webpack-merge');
const webpackBase = require('./config.base');
const glob = require('glob');
const fs = require('fs');

const markdown = glob.sync('./changelogs/*.md');

markdown.forEach((md) => {
  fs.readFile(md, 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
  });
});

module.exports = merge(webpackBase, {
  devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.js$/,
      use: [
        'eslint-loader',
      ],
    }],
  },
  plugins: [
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: false,
    }),
  ],
});
