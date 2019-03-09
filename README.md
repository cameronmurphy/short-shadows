Short Shadows
===========
[![Codeship Status for cameronmurphy/short-shadows](https://app.codeship.com/projects/77fbcc10-2458-0137-0f16-0e0a32caa97a/status?branch=master)](https://app.codeship.com/projects/330106)

This is a Craft 3 website.

Requirements
------------
To run this website locally you will need [Vagrant](https://vagrantup.com) and [VirtualBox](https://virtualbox.org).
You can install them on macOS using [Homebrew](https://brew.sh).
```bash
$ brew cask install virtualbox vagrant
```

Getting started
---------------
Before running the virtual machine you will need to create environment files. The defaults in the example files should
suffice.
```bash
$ cp .env.example .env
```

To bring up the virtual machine, run `vagrant up`. Once the machine is online run these commands.
```bash
$ vagrant ssh
$ cd /var/www
$ composer install
$ ./craft setup/security-key
$ npm install
```

Code standards
--------------
The tools `eslint` and `sass-lint` are used to ensure `*.js` and `*.scss` files meet the code standards. Use the
commands `npm run lint-js` and `npm run lint-scss` to lint the codebase. 

Database sync
-------------
```bash
$ cp scripts/.env.sh.example scripts/.env.sh
# Populate variables in scripts/.env.sh
$ npm run sync-database
```

Production asset deployment
---------------------------
This relies on the the `ASSET_*` environment variables being exported in `/etc/environment`.
```bash
$ npm run build-prod
$ composer deploy-assets
```
