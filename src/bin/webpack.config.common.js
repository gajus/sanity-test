const path = require('path');

const postcssPlugins = [
  require('postcss-partial-import')({
    extension: '.scss',
    prefix: '_'
  }),
  require('postcss-advanced-variables')(),
  require('postcss-calc')(),
  require('postcss-nested')(),
  require('postcss-svg')({
    paths: [
      path.resolve(__dirname, '../app/styles/icons')
    ]
  })
];

if (process.env.NODE_ENV !== 'development') {
  postcssPlugins.push(require('autoprefixer'));
}

module.exports = {
  context: path.join(__dirname, '..'),
  output: {
    chunkFilename: '[name].js',
    filename: '[name].js',
    path: path.join(__dirname, '../../dist/client'),
    publicPath: '/static/'
  },
  postcss () {
    return postcssPlugins;
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, '../../node_modules/react'),
      'react-dom': path.resolve(__dirname, '../../node_modules/react-dom')
    }
  }
};
