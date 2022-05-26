<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see \craft\config\GeneralConfig
 */

use craft\helpers\App;

$isDev = App::env('CRAFT_ENVIRONMENT') === 'dev';
$isProd = App::env('CRAFT_ENVIRONMENT') === 'production';

return [
    // Default Week Start Day (0 = Sunday, 1 = Monday...)
    'defaultWeekStartDay' => 1,

    // Whether generated URLs should omit "index.php"
    'omitScriptNameInUrls' => true,

    // Whether Dev Mode should be enabled (see https://craftcms.com/guides/what-dev-mode-does)
    'devMode' => $isDev,

    // Whether administrative changes should be allowed
    'allowAdminChanges' => $isDev,

    // Whether crawlers should be allowed to index pages and following links
    'disallowRobots' => !$isProd,

    'aliases' => [
        '@assetBaseUrl' => getenv('ASSET_BASE_URL'),
        '@assetAccessKeyId' => getenv('ASSET_ACCESS_KEY_ID'),
        '@assetSecretAccessKey' => getenv('ASSET_SECRET_ACCESS_KEY'),
        '@assetEndpoint' => getenv('ASSET_ENDPOINT'),
        '@assetRegion' => getenv('ASSET_REGION'),
        '@assetBucket' => getenv('ASSET_BUCKET'),
        '@assetSubfolder' => getenv('ASSET_SUBFOLDER'),
    ],
];
