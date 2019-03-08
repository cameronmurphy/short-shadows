const _ = require('lodash');
const Encore = require('@symfony/webpack-encore');
const CompressionPlugin = require('compression-webpack-plugin');

Encore.setOutputPath('web/static/assets')
  .setPublicPath('/static/assets')
  .addEntry('main', './templates/_scripts/main.js')
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning()
  .enableSingleRuntimeChunk()
  .cleanupOutputBeforeBuild()
  .enableSassLoader(() => {}, {
    // https://github.com/symfony/webpack-encore/issues/253
    resolveUrlLoader: false,
  })
  .enablePostCssLoader()
  .copyFiles({
    from: './node_modules/photoswipe/dist',
    to: 'photoswipe/[path][name].[ext]',
    pattern: '/.(png|svg)$/',
  });

if (Encore.isProduction()) {
  Encore.addPlugin(
    new CompressionPlugin({
      filename: '[path][query]',
      exclude: /\.svg$/,
    })
  );
}

const config = Encore.getWebpackConfig();
_.set(config, 'watchOptions', { poll: true, ignored: /node_modules/ });

module.exports = config;
