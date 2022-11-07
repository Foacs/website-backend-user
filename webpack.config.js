const path = require('path');
const glob = require('glob');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');

const entryArray = glob.sync('./src/**/index.ts');

const entryObject = entryArray.reduce((acc, item) => {
  let name = path.dirname(item.replace('./src/', ''));
  acc[name] = item;
  return acc;
}, {});

const zipPlugins = Object.keys(entryObject).map((name) => {
  return new ZipPlugin({
    path: path.resolve(__dirname, 'build/'),
    filename: name,
    extension: 'zip',
    include: [name],
  });
});

module.exports = {
  entry: entryObject,
  devtool: 'source-map',
  target: 'node',
  plugins: [...zipPlugins, new CleanWebpackPlugin(), new ProgressBarPlugin()],

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
