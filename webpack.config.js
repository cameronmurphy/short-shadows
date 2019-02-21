const _ = require('lodash');
const Encore = require('@symfony/webpack-encore');

Encore.setOutputPath('web/dist/')
  .setPublicPath('/dist')
  .addEntry('main', './templates/_scripts/main.js')
  .enableSourceMaps(!Encore.isProduction())
  .enableSingleRuntimeChunk()
  .cleanupOutputBeforeBuild()
  .enableVersioning()
  .enableSassLoader()
  .enablePostCssLoader();

const config = Encore.getWebpackConfig();
_.set(config, 'watchOptions', { poll: true, ignored: /node_modules/ });

module.exports = config;
