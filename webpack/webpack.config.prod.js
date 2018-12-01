const path = require('path')

const config = require('./webpack.config.base')

config.mode = 'production'
config.output.filename = 'js/[name]-[chunkhash].js'

module.exports = config
