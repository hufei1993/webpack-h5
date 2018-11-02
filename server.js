const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const ip = require('ip');
const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);
const port = 8888;
const instance = webpackDevMiddleware(compiler, {
  logLevel:'warn',
  stats: {
    colors: true,
    modules: false,
  },
  publicPath: config.output.publicPath,
  lazy: false
});
instance.waitUntilValid(() => {//实例验证通过
  console.log(`本地地址：http://localhost:${port}`);
  console.log(`LAN地址：http://${ip.address()}:${port}`);
});

app.use(instance);
app.use(webpackHotMiddleware(compiler));//热刷新

app.listen(port, function () {
  console.log('服务启动中...');
});