const {resolve} = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: resolve('./dist/'),
    filename: 'wdlk-mini-cart.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
