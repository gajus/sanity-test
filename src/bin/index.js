const path = require('path');
const express = require('express');
const webpack = require('webpack');
const expressBasicAuth = require('express-basic-auth');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

const webpackConfig = require('./webpack.config.development');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const bundler = webpack(webpackConfig);

const devServerOptions = {
  colors: true,
  hot: true,
  noInfo: true,
  outputPath: path.join(__dirname, '/dist/client'),
  publicPath: '/static/',
  quiet: false,
  stats: 'minimal'
};

app.use(webpackDevMiddleware(bundler, devServerOptions));
app.use(webpackHotMiddleware(bundler));

app.get('*', (req, res) => {
  res
    .header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    .header('Expires', '-1')
    .header('Pragma', 'no-cache')
    .render('index.ejs', {
      mainScriptName: 'app.js',
      mainStyleName: null,
      title: 'Applaudience (development environment)',
      vendorScriptName: 'vendor.js'
    });
});

app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');

app.listen(8000);
