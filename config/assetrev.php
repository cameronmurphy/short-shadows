<?php

return [
    '*' => [
        'manifestPath' => 'web/static/assets/manifest.json',
        'assetsBasePath' => 'web/static/assets/',
    ],
    'production' => [
        'assetUrlPrefix' => getenv('ASSET_BASE_URL'),
    ],
];
