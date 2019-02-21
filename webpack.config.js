const _ = require('lodash');
const Encore = require('@symfony/webpack-encore');
const CompressionPlugin = require('compression-webpack-plugin');

Encore.setOutputPath('web/static/assets')
  .setPublicPath('/static/assets')
  .addEntry('main', './templates/_scripts/main.js')
  .enableSourceMaps(!Encore.isProduction())
  .enableSingleRuntimeChunk()
  .cleanupOutputBeforeBuild()
  .enableVersioning()
  .enableSassLoader(() => {}, {
    // https://github.com/symfony/webpack-encore/issues/253
    resolveUrlLoader: false,
  })
  .enablePostCssLoader();

if (Encore.isProduction()) {
  Encore.addPlugin(new CompressionPlugin({
    filename: '[path][query]'
  }));
}

const config = Encore.getWebpackConfig();
_.set(config, 'watchOptions', { poll: true, ignored: /node_modules/ });

module.exports = config;
