const {resolve} = require('path');
const AutoPrefixer = require('autoprefixer');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HappyPack = require('happypack');

const ExtractSass = new ExtractTextPlugin({
  filename: "/index.css.liquid",
});

module.exports = {
  entry: './src/scripts/index',
  output: {
    path: resolve('./src/assets/'),
    filename: 'index.js.liquid'
  },
  module: {
    loaders: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loader: 'happypack/loader?id=ts'
      },
      {
        test: /\.scss$/,
        use: ExtractSass.extract({
          use: [{
            loader: "css-loader",
              options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                 AutoPrefixer({ browsers: [ 'last 4 versions' ] });
              }
            }
          },
          {
            loader: "sass-loader"
          }],
        })
      }
    ],
  },
  plugins: [
    ExtractSass,
    new HappyPack({
      id: 'ts',
      threads: 2,
      loaders: [
        'babel-loader',
        {
          path: 'ts-loader',
          query: { happyPackMode: true }
        }
      ]
    }),
    new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  watch: true
}
