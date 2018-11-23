const _ = require('lodash');
const Encore = require('@symfony/webpack-encore');

Encore.setOutputPath('web/dist/')
  .setPublicPath('/dist')
  .addEntry('scripts', './templates/_scripts/main.js')
  .addStyleEntry('styles', './templates/_styles/main.scss')
  .enableSourceMaps(!Encore.isProduction())
  .autoProvidejQuery()
  .cleanupOutputBeforeBuild()
  .enableVersioning()
  .enableSassLoader(() => {}, {
    // https://github.com/symfony/webpack-encore/issues/253
    resolveUrlLoader: false,
  })
  .enablePostCssLoader(options => {
    _.set(options, 'config.path', 'config/postcss.config.js');
  });

const config = Encore.getWebpackConfig();
_.set(config, 'watchOptions', { poll: true, ignored: /node_modules/ });

module.exports = config;
