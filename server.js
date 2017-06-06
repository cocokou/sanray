const express = require('express')
const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')
const webpacDevConfig    = require('./webpack.dev.config.js')
const webpackDeployConfig = require('./webpack.deploy.config.js')

const app = express()
const compiler =
  process.env.NODE_ENV === 'deployment'
  ? webpack(webpackDeployConfig)
  : webpack(webpacDevConfig)

app.use(webpackDevMiddleware(compiler))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'index.html'))
})

const port = process.env.PORT || 8001
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
