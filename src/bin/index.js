const path = require('path');
const express = require('express');
const webpack = require('webpack');
const expressBasicAuth = require('express-basic-auth');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.use(expressBasicAuth({
  challenge: true,
  users: {
    applaudience: 'burn after reading'
  }
}));

if (process.env.NODE_ENV === 'development') {
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
} else {
  const serveStatic = require('serve-static');
  const compression = require('compression');
  const webpackConfig = require('./webpack.config.production');

  app.use(compression());

  webpack(webpackConfig, (error, stats) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error(error);

      throw new Error('Compilation error');
    }

    // eslint-disable-next-line no-console
    console.log(stats.toString());

    const compilationInformation = stats.toJson({
      assets: true,
      children: false,
      chunks: false,
      entrypoints: false,
      errors: true,
      modules: false,
      stats: true
    });

    if (stats.hasErrors()) {
      // eslint-disable-next-line no-console
      console.error(compilationInformation.errors);

      throw new Error('Compilation error');
    }

    const mainScript = compilationInformation.assetsByChunkName.app.find((asset) => {
      return asset.endsWith('.js');
    });

    const mainStyle = compilationInformation.assetsByChunkName.app.find((asset) => {
      return asset.endsWith('.css');
    });

    app.get('*', (req, res) => {
      res
        .header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
        .header('Expires', '-1')
        .header('Pragma', 'no-cache')
        .render('index.ejs', {
          mainScriptName: mainScript,
          mainStyleName: mainStyle,
          title: 'Applaudience',
          vendorScriptName: compilationInformation.assetsByChunkName.vendor
        });
    });
  });

  app.use('/static', serveStatic(path.resolve(__dirname, './.dist')));
}

app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');

app.listen(8000);
