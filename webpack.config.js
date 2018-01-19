const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HappyPack = require('happypack');

// Ensure `postcss` key is extracted
HappyPack.SERIALIZABLE_OPTIONS = HappyPack.SERIALIZABLE_OPTIONS.concat(['postcss']);

module.exports = {
  entry: './src/scripts/index',
  output: {
    path: resolve('./src/assets/'),
    filename: 'index.js.liquid'
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'happypack/loader?id=ts'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('happypack/loader?id=styles')
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin({ filename: resolve('/index.css.liquid')}),
    new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),

    new HappyPack({
      id: 'styles',
      loaders: [ 'css-loader', 'postcss-loader', 'sass-loader']
    }),

    new HappyPack({
      id: 'ts',
      loaders: [
        { loader: 'babel-loader' },
        { loader: 'ts-loader', options: { happyPackMode: true } }
      ],
      threads: 4
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  watch: true
}
