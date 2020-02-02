const merge = require('webpack-merge')
const commonConfig = require('./webpack.config.js')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = merge(commonConfig, {
  mode   : 'development',
  devtool: 'source-map',
  watch  : true,
  plugins: [
    new BrowserSyncPlugin({
      host: process.env.IP || 'localhost',
      port: process.env.PORT || 3000,
      server: {
        baseDir: ['./', './build']
      }
    }),
  ]
})
