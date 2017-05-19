const {resolve} = require('path');
const babel = require('rollup-plugin-babel');

module.exports = {
  entry: './src/index.js',
  output: {
    path: resolve('./dist/'),
    filename: 'wdlk-mini-cart.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'rollup-loader',
        options: {
          plugins: [
            babel({
              exclude: 'node_modules/**'
            })
          ]
        }

      }
    ]
  }
};
