var Encore = require('@symfony/webpack-encore');
var CompressionPlugin = require('compression-webpack-plugin');

if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
  .setOutputPath('web/static/assets/')
  .setPublicPath('/static/assets')
  .addEntry('main', './templates/_scripts/main.js')
  .enableSingleRuntimeChunk()
  .cleanupOutputBeforeBuild()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning()
  .enableSassLoader(() => {}, {
    // https://github.com/symfony/webpack-encore/issues/253
    resolveUrlLoader: false,
  })
  .enablePostCssLoader()
  .configureBabel((config) => {
      config.plugins.push('@babel/plugin-proposal-class-properties');
  })
  .configureBabelPresetEnv((config) => {
    config.useBuiltIns = 'usage';
    config.corejs = 3;
  })

if (Encore.isProduction()) {
  Encore.addPlugin(
    new CompressionPlugin({
      filename: '[path][query]',
      exclude: /\.json|\.svg$/,
    })
  );
}

module.exports = Encore.getWebpackConfig();
