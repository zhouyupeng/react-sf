var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'segmentfault');
var BUILD_PATH = path.resolve(ROOT_PATH, 'src');

module.exports = {
    entry: {
      app: path.resolve(APP_PATH, 'index.jsx')
    },
    output: {
      path: BUILD_PATH,
      filename: '[name].js'
    },
    //enable dev source map
    devtool: 'eval-source-map',
    //devtool: false,
    //enable dev server
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true
    },
    //babel重要的loader在这里
    module: {
      loaders: [{
        test: /\.jsx?$/,
        loader: 'babel',
        include: APP_PATH
          // query: {
          //   //添加两个presents 使用这两种presets处理js或者jsx文件
          //   presets: ['es2015', 'react']
          // }
      }, {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }, {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }]
    },
    plugins: [
      new HtmlwebpackPlugin({
        title: 'My first react app'
      })
    ]
  }
  // http://localhost:8080/