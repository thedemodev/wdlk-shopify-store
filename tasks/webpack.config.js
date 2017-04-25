const {resolve} = require('path');

module.exports = {
  entry: './src/scripts/index.js',
  output: {
    path: resolve('./src/scripts/'),
    filename: 'index.js.liquid'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}
