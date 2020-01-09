const webpack = require('webpack')
const merge = require('webpack-merge')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const baseConfig = require('./webpack.config.base')

const entry = {}

Object.keys(baseConfig.entry).forEach(key => {
  entry[key] = ['webpack-hot-middleware/client', baseConfig.entry[key]]
})

const devConfig = {
  mode: 'development',
  output: {
    filename: 'js/[name].js'
  },
  devtool: 'source-map',
  entry: entry,
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Untitled',
      template: './index.html'
    })
  ]
}

const config = merge(baseConfig, devConfig)

module.exports = config
