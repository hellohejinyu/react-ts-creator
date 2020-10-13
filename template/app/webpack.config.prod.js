const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const baseConfig = require('./webpack.config.base')

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name]-[chunkhash].js',
  },
  plugins: [new CleanWebpackPlugin()],
}

const config = merge(baseConfig, prodConfig)

module.exports = config
