#!/usr/bin/env php

<?php

// Set path constants
define('CRAFT_BASE_PATH', dirname(__DIR__));
define('CRAFT_VENDOR_PATH', CRAFT_BASE_PATH.'/vendor');

// Load Composer's autoloader
require_once CRAFT_VENDOR_PATH.'/autoload.php';

// Load dotenv?
if (file_exists(CRAFT_BASE_PATH.'/.env')) {
  (new Dotenv\Dotenv(CRAFT_BASE_PATH))->load();
}

if (getenv('ENVIRONMENT') == 'dev') {
  die("This is probably a mistake, don't run this in dev\n");
}

use Aws\S3\S3Client;
use League\Flysystem\AwsS3v3\AwsS3Adapter;
use League\Flysystem\FileNotFoundException;
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

$adapter = new AwsS3Adapter($client, getenv('ASSET_BUCKET'), 'static');
$remoteFs = new Filesystem($adapter);

/**
 * @param Filesystem $remoteFs
 * @param string $baseDir
 * @param string|null $relativePath
 * @throws \League\Flysystem\FileNotFoundException
 */
function recursiveUpload(Filesystem $remoteFs, string $baseDir, string $relativePath = null) {
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
      if ($remoteFs->has($entryRelativePath)) {
        echo sprintf("Removing %s on remote FS\n", $entryRelativePath);
        $remoteFs->delete($entryRelativePath);
      }

      echo sprintf("Writing %s to remote FS\n", $entryRelativePath);
      $remoteFs->put($entryRelativePath, file_get_contents($entryAbsolutePath), [
        'visibility' => 'public',
      ]);
    }
  }
}

try {
  recursiveUpload($remoteFs, __DIR__ . '/../web/static');
} catch (FileNotFoundException $e) {
  die($e->getMessage());
}
