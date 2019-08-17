var Encore = require('@symfony/webpack-encore');
var CompressionPlugin = require('compression-webpack-plugin');

if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
  .setOutputPath('web/static/assets')
  .setPublicPath('/static/assets')
  .addEntry('main', './templates/_scripts/main.js')
  .copyFiles({
    from: './node_modules/photoswipe/dist',
    to: 'photoswipe/[path][name].[ext]',
    pattern: /.(png|svg)$/,
  })
  .enableSingleRuntimeChunk()
  .cleanupOutputBeforeBuild()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning()
  .enableSassLoader()
  .enablePostCssLoader()
  .configureBabel(() => {}, {
    useBuiltIns: 'usage',
    corejs: 3
  })
;

if (Encore.isProduction()) {
  Encore.addPlugin(
    new CompressionPlugin({
      filename: '[path][query]',
      exclude: /\.svg$/,
    })
  );
}

module.exports = Encore.getWebpackConfig();
