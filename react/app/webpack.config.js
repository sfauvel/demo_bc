const path = require('path')

module.exports = {
  entry: './src/BlockchainApp.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'blockchain.js'
  },
  mode: 'production',
  module: {
      rules: [{
        exclude: /node_modules/,
        loader: 'babel-loader'
      }]
  }
}
