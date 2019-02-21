<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see craft\config\GeneralConfig
 */

return [
    // Global settings
    '*' => [
        // Default Week Start Day (0 = Sunday, 1 = Monday...)
        'defaultWeekStartDay' => 1,

        // Whether generated URLs should omit "index.php"
        'omitScriptNameInUrls' => true,

        // Control Panel trigger word
        'cpTrigger' => 'admin',

        // The secure key Craft will use for hashing and encrypting data
        'securityKey' => getenv('SECURITY_KEY'),

        // Whether to save the project config out to config/project.yaml
        // (see https://docs.craftcms.com/v3/project-config.html)
        'useProjectConfigFile' => true,

        'aliases' => [
            '@assetBaseUrl' => getenv('ASSET_BASE_URL'),
            '@assetAccessKeyId' => getenv('ASSET_ACCESS_KEY_ID'),
            '@assetSecretAccessKey' => getenv('ASSET_SECRET_ACCESS_KEY'),
            '@assetEndpoint' => getenv('ASSET_ENDPOINT'),
            '@assetRegion' => getenv('ASSET_REGION'),
            '@assetBucket' => getenv('ASSET_BUCKET'),
            '@assetSubfolder' => getenv('ASSET_SUBFOLDER'),
        ],
    ],

    // Dev environment settings
    'dev' => [
        // Dev Mode (see https://craftcms.com/support/dev-mode)
        'devMode' => true,
    ],

    // Staging environment settings
    'staging' => [
        // Prevent administrative changes from being made on staging
        'allowAdminChanges' => false,
    ],

    // Production environment settings
    'production' => [
        // Prevent administrative changes from being made on production
        'allowAdminChanges' => false,
    ],
];
