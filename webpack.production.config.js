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
    //这个使用uglifyJs压缩你的js代码
    new webpack.optimize.UglifyJsPlugin({
      minimize: true, //压缩代码
      output: {
        comments: false, // remove all comments
      },
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ]
}