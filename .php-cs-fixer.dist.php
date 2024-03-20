<?php

declare(strict_types=1);
use PhpCsFixer\Config;
use PhpCsFixer\Finder;

$config = new Config();

return $config
    ->setRules([
        '@PhpCsFixer' => true,
        'concat_space' => ['spacing' => 'one'],
    ])
    ->setRiskyAllowed(true)
    ->setFinder(
        Finder::create()
            ->in(__DIR__ . '/config')
            ->in(__DIR__ . '/scripts')
            ->in(__DIR__ . '/web')
    )
;
