const {resolve} = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "/index.css.liquid"
});

module.exports = {
  entry: './src/scripts/index.js',
  output: {
    path: resolve('./src/assets/'),
    filename: 'index.js.liquid'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
          loader: "css-loader"
          }, {
            loader: 'postcss-loader'
          }, {
          loader: "sass-loader"
          }]
        })
      }
    ],
  },
  plugins: [
    extractSass
  ],
  watch: true
}
