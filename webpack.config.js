// const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Phaser webpack config
const phaserModule = path.join(__dirname, '/node_modules/phaser-ce/')
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
const pixi = path.join(phaserModule, 'build/custom/pixi.js')
const p2 = path.join(phaserModule, 'build/custom/p2.js')

module.exports = {
  entry: {
    app: ['./src/index.js'],
    vendor: ['pixi', 'p2', 'phaser', 'webfontloader']
  },
  output: {
    pathinfo  : true,
    filename: '[name].js',
    path: path.join(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['vendor', 'app'],
      chunksSortMode: 'manual',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: false,
        html5: true,
        minifyCSS: false,
        minifyJS: false,
        minifyURLs: false,
        removeComments: false,
        removeEmptyAttributes: false
      },
      hash: true
    }),
    new webpack.ExtendedAPIPlugin(),
  ],
  module: {
    rules: [{
        test: /\.js$/,
        use: ['babel-loader']
      },
      {
        test: /pixi\.js/,
        use: ['expose-loader?PIXI']
      },
      {
        test: /phaser-split\.js$/,
        use: ['expose-loader?Phaser']
      },
      {
        test: /p2\.js/,
        use: ['expose-loader?p2']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: 'base64-inline-loader?name=[name].[ext]'
      },
      {
        test: /\.(jpe?g|png|.mp3)$/,
        // use: 'file-loader?publicPath=&name=[name].[ext]'
        use: 'base64-inline-loader?name=[name].[ext]'
      }
    ]
  },
  resolve: {
    alias: {
      phaser: phaser,
      pixi: pixi,
      p2: p2,
      Assets: path.resolve(__dirname, 'assets'),
    }
  }
}