const path = require('path');
const glob = require('glob');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');

const entryArray = glob.sync('./src/**/index.ts');

const entryObject = entryArray.reduce((acc, item) => {
  let name = path.dirname(item.replace('./src/', ''));
  acc[name] = item;
  return acc;
}, {});

module.exports = {
  entry: entryObject,
  devtool: 'source-map',
  target: 'node',
  plugins: [new ProgressBarPlugin()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name]/index.js',
    path: path.resolve(__dirname, 'build'),
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    libraryTarget: 'commonjs2',
  },
};
