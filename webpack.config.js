const Encore = require('@symfony/webpack-encore');
const CompressionPlugin = require('compression-webpack-plugin');

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
  .enablePostCssLoader()
  .configureBabel((config) => {
      config.plugins.push('@babel/plugin-proposal-class-properties');
  })
  .configureManifestPlugin((config) => {
    config.removeKeyHash = /([a-f0-9]{8}\.?)/gi;
  })
  .configureBabelPresetEnv((config) => {
    config.useBuiltIns = 'usage';
    config.corejs = 3;
  })
  .enableSassLoader(() => {}, {
    // https://github.com/symfony/webpack-encore/issues/253
    resolveUrlLoader: false,
  });

if (Encore.isProduction()) {
  Encore.addPlugin(
    new CompressionPlugin({
      deleteOriginalAssets: true,
      exclude: /\.json|\.svg$/,
      filename: '[path][base]',
    })
  );
}

module.exports = Encore.getWebpackConfig();
