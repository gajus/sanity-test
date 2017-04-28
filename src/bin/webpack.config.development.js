const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.config.common.js');

module.exports = {
  context: common.context,
  devtool: 'eval-source-map',
  entry: {
    app: [
      'webpack-hot-middleware/client',
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      './app'
    ]
  },
  module: {
    rules: [
      {
        include: path.resolve(__dirname, '../app'),
        loader: 'babel-loader',
        options: {
          plugins: [
            [
              'react-css-modules',
              {
                context: common.context,
                filetypes: {
                  '.scss': 'postcss-scss'
                },
                generateScopedName: '[name]___[local]___[hash:base64:5]',
                webpackHotModuleReloading: true
              }
            ]
          ]
        },
        test: /\.js$/
      },
      {
        loaders: [
          'style-loader?sourceMap',
          'css-loader?modules&camelCase=true&importLoaders=1&localIdentName=[name]___[local]___[hash:base64:5]',
          'resolve-url-loader',
          'postcss-loader?parser=postcss-scss',
          'sass-loader'
        ],
        test: /\.scss/
      },
      {
        loader: 'file-loader',
        query: {
          digest: 'hex',
          hash: 'sha512',
          name: '[name]-[hash].[ext]'
        },
        test: /\.(svg|jpe?g|png|gif|woff2?)$/i
      },
      {
        loader: 'json-loader',
        test: /\.json$/
      }
    ]
  },
  output: common.output,
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        context: common.context,
        postcss: common.postcss
      }
    }),
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname),
      verbose: true
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: common.resolve
};
