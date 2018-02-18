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
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader'
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loader: 'happypack/loader?id=ts'
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'happypack/loader?id=js'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('happypack/loader?id=styles')
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin({ filename: resolve('/index.css.liquid')}),

    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
      watch: ['./src/scripts']
    }),

    new HappyPack({
      id: 'styles',
      loaders: [ 'css-loader', 'postcss-loader', 'sass-loader']
    }),

    new HappyPack({
      id: 'ts',
      threads: 2,
      loaders: [
        { path: 'babel-loader' },
        { path: 'ts-loader', query: { happyPackMode: true } }
      ]
    }),
    new HappyPack({
      id: 'js',
      threads: 2,
      loaders: [
        {
          path: 'babel-loader',
        }
      ]
    })

  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  watch: true
}
