const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 6 });

// Ensure `postcss` key is extracted
HappyPack.SERIALIZABLE_OPTIONS = HappyPack.SERIALIZABLE_OPTIONS.concat(['postcss']);


module.exports = {
  entry: {
    index: './src/scripts/index',
    tracking: './src/scripts/tracking/tracking'
  },
  output: {
    path: resolve('./src/assets/'),
    filename: '[name].js.liquid'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract('happypack/loader?id=styles')
      },
      {
        test: /\.ts(x?)$/,
        use: 'happypack/loader?id=ts',
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: 'styles',
      threadPool: happyThreadPool,
      loaders: [ 'css-loader', 'postcss-loader', 'sass-loader']
    }),
    new HappyPack({
      id: 'ts',
      threadPool: happyThreadPool,
      loaders: [
        { path: 'babel-loader' },
        {
          path: 'ts-loader',
          options: {
            transpileOnly: true
          },
          query: { happyPackMode: true } }
      ]
    }),
    new ExtractTextPlugin({ filename: resolve('/index.css.liquid') }),
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
      tslint: true,
      watch: ['./src/scripts']
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  watch: true
}
