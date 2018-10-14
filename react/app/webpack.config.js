const path = require('path')

module.exports = {
  entry: './src/ReactApp.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js'
  },
  mode: 'production',
  module: {
      rules: [{
        exclude: /node_modules/,
        loader: 'babel-loader'
      }]
  }
}
