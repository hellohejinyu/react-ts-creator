const config = require('./webpack.config.dev')
const express = require('express')
const openBrowser = require('react-dev-utils/openBrowser')
const webpack = require('webpack')

const PORT = 8800

const app = express()
const compiler = webpack(config)

app.set('view engine', 'ejs')

app.use(require('webpack-dev-middleware')(compiler))

app.use(require('webpack-hot-middleware')(compiler))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Connection, User-Agent, Cookie')
  next()
})

app.get('*', (req, res) => {
  res.render('index')
})

const interfaces = require('os').networkInterfaces() // get ip address in local area network
let ip = 'localhost'
for (var devName in interfaces) {
  var iface = interfaces[devName]
  for (var i = 0; i < iface.length; i++) {
    var alias = iface[i]
    if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
      ip = alias.address
    }
  }
}

function startServer (port) {
  app.listen(port, () => {
    if (openBrowser(`http://${ip}:${port}`)) {
      console.log(`Server Started. Listen http://${ip}:${port}`)
    }
  }).on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
      startServer(port + 11)
    } else {
      throw new Error('Unknown Error')
    }
  })
}

startServer(PORT)
