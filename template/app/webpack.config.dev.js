const { merge } = require('webpack-merge')
const webpack = require('webpack')

const baseConfig = require('./webpack.config.base')

const devConfig = {
  mode: 'development',
  output: {
    filename: '[name].js',
  },
  devtool: 'source-map',
  entry: ['webpack-hot-middleware/client', baseConfig.entry],
  plugins: [new webpack.HotModuleReplacementPlugin()],
}

const config = merge(baseConfig, devConfig)

module.exports = config
