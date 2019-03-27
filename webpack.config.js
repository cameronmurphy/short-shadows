var _ = require('lodash');
var Encore = require('@symfony/webpack-encore');
var CompressionPlugin = require('compression-webpack-plugin');

Encore
  .setOutputPath('web/static/assets')
  .setPublicPath('/static/assets')
  .addEntry('main', './templates/_scripts/main.js')
  .copyFiles({
    from: './node_modules/photoswipe/dist',
    to: 'photoswipe/[path][name].[ext]',
    pattern: '/.(png|svg)$/',
  })
  .enableSingleRuntimeChunk()
  .cleanupOutputBeforeBuild()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning()
  .enableSassLoader(() => {}, {
    // https://github.com/symfony/webpack-encore/issues/253
    resolveUrlLoader: false,
  })
  .enablePostCssLoader()
  .configureBabel(function(babelConfig) {
    const presetEnvPreset = _.find(babelConfig.presets, element => _.includes(element, '@babel/preset-env'));
    const presetEnvConfig = _.find(presetEnvPreset, _.isObject);
    _.set(presetEnvConfig, 'corejs', '3');
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
