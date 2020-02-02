const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.config.js')

module.exports = merge(commonConfig, {
  mode: 'production',
  performance: {
    hints: false
  },
  optimization: {
    minimizer: [new UglifyJSPlugin({
      parallel    : 4,
      uglifyOptions: {
        drop_console: true,
        // minimize    : true,
        output      : {
          comments: false
        }
      }
    })]
  },
  output: {
    // pathinfo  : true,
    // filename: '[name].js',
    path: path.join(__dirname, 'publish')
  }
})
