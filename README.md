Short Shadows
===========
[![Codeship Status for cameronmurphy/short-shadows](https://app.codeship.com/projects/184d8d20-2c1c-0137-ed32-62ec0ec7f787/status?branch=master)](https://app.codeship.com/projects/331257)

This is a Craft 3 website.

Requirements
------------
To run this website locally you will need [Docker](https://www.docker.com/products/docker-desktop). You can install them on macOS using
[Homebrew](https://brew.sh).
```bash
$ brew install docker --cask
```
You will also need PHP, NVM and Yarn.
```bash
$ brew install php nvm
$ nvm install
$ npm install -g yarn
```

Getting started
---------------
Before running the virtual machine you will need to create environment files. The defaults in the example files should suffice.
```bash
$ cp .env.example .env
```
Optionally you can configure values for `FORWARD_APP_PORT` and `FORWARD_DB_PORT` if you do not with to use the standard ports.
To run the application:
```bash
$ docker-compose up
$ composer install
$ composer craft setup/security-key
$ yarn install
```

Code standards
--------------
The tools `eslint` and `sass-lint` are used to ensure `*.js` and `*.scss` files meet the code standards. Use the commands `yarn lint-js` and
`yarn lint-scss` to lint the codebase. 

Database sync
-------------
```bash
$ cp scripts/.env.sh.example scripts/.env.sh
# Populate variables in scripts/.env.sh
$ composer sync-database
```

Production asset deployment
---------------------------
This relies on the the `ASSET_*` environment variables being exported in `/etc/environment`.
```bash
$ yarn build
$ composer deploy-assets
```
