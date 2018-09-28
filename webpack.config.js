const Dotenv = require('dotenv-webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 4 });
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolve } = require('path');

// Ensure `postcss` key is extracted
HappyPack.SERIALIZABLE_OPTIONS = HappyPack.SERIALIZABLE_OPTIONS.concat(['postcss']);


module.exports = {
  entry: {
    index: './src/scripts/index',
    tracking: './src/scripts/tracking/tracking'
  },
  output: {
    path: resolve('./src/assets'),
    filename: '[name].js.liquid'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: [
          MiniCssExtractPlugin.loader,
         'happypack/loader?id=styles',
        ]
      },
      {
        test: /\.ts(x?)$/,
        use: 'happypack/loader?id=ts',
      }
    ]
  },
  mode: "production",
  plugins: [
    new Dotenv(),
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
          query: { happyPackMode: true } },
      ]
    }),
    new MiniCssExtractPlugin({
      filename: resolve('/index.css.liquid'),
      chunkFilename: '[id].css'
    }),
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
      tslint: true,
      watch: ['./src/scripts']
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
}
