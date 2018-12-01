const config = require('./webpack.config.base')

const webpack = require('webpack')

config.mode = 'development'
config.output.filename = 'js/[name].js'
config.devtool = 'source-map'

const entry = {}

Object.keys(config.entry).forEach(key => {
  entry[key] = ['webpack-hot-middleware/client' , config.entry[key]]
})

console.log(entry)

config.entry = entry

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin()
])

module.exports = config
