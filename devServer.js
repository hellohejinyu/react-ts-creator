const config = require('./webpack/webpack.config.dev')
const express = require('express')
const openBrowser = require('react-dev-utils/openBrowser')
const webpack = require('webpack')

const port = 8877

const app = express()
const compiler = webpack(config)

app.set('view engine', 'ejs')

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true
}))

app.use(require('webpack-hot-middleware')(compiler))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Connection, User-Agent, Cookie')
  next();
})

app.get('*', (req, res) => {
  res.render('index');
})

app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  if (openBrowser(`http://localhost:${port}`)) {
    console.log(`Server Started. Listen :${port}`);
  }
})

