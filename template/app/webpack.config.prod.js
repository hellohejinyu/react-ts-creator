process.env.NODE_ENV = 'production'

const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const baseConfig = require('./webpack.config.base')

const prodConfig = {
  mode: 'production',
  output: {
    filename: 'js/[name]-[chunkhash].js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'App',
      template: './tmpl/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[chunkhash].css',
      chunkFilename: 'css/[id]-[chunkhash].css'
    })
  ]
}

const config = merge(baseConfig, prodConfig)

module.exports = config
