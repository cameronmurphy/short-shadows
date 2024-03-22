#!/usr/bin/env php
<?php

require dirname(__DIR__) . '/bootstrap.php';

if ('dev' == getenv('ENVIRONMENT')) {
    exit("This is probably a mistake, don't run this in dev\n");
}

use Aws\S3\S3Client;
use League\Flysystem\AwsS3V3\AwsS3V3Adapter;
use League\Flysystem\Filesystem;

$client = new S3Client([
    'credentials' => [
        'key' => getenv('ASSET_ACCESS_KEY_ID'),
        'secret' => getenv('ASSET_SECRET_ACCESS_KEY'),
    ],
    'region' => getenv('ASSET_REGION'),
    'version' => '2006-03-01',
    'endpoint' => getenv('ASSET_ENDPOINT'),
]);

$adapter = new AwsS3V3Adapter($client, getenv('ASSET_BUCKET'), 'dist');
$remoteFs = new Filesystem($adapter);

function recursiveUpload(Filesystem $remoteFs, string $baseDir, ?string $relativePath = null): void
{
    $absolutePath = $relativePath ? join('/', [$baseDir, $relativePath]) : $baseDir;

    foreach (scandir($absolutePath) as $entry) {
        if (preg_match('/^\./', $entry)) {
            // Skip hidden files
            continue;
        }

        $entryAbsolutePath = join('/', [$absolutePath, $entry]);
        $entryRelativePath = join('/', [$relativePath, $entry]);

        if (is_dir($entryAbsolutePath)) {
            recursiveUpload($remoteFs, $baseDir, $entryRelativePath);
        } else {
            $config = ['visibility' => 'public'];

            if (preg_match('/\.(css|js)$/', $entry, $matches)) {
                $config['ContentEncoding'] = 'gzip';

                $contentType = 'js' === $matches[1] ? 'javascript' : $matches[1];
                $config['ContentType'] = 'text/' . $contentType;
            } elseif (preg_match('/\.svg$/', $entry, $matches)) {
                $config['ContentType'] = 'image/svg+xml';
            }

            echo sprintf("Writing %s to remote FS\n", $entryRelativePath);
            $remoteFs->write($entryRelativePath, file_get_contents($entryAbsolutePath), $config);
        }
    }
}

recursiveUpload($remoteFs, __DIR__ . '/../web/dist');
