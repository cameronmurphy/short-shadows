Short Shadows
===========
[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/34vMYXApuzs6spAruM7wQy/XJUYmpS259qnjU8ZtHAxPN/tree/main.svg?style=svg&circle-token=CCIPRJ_17ckPKwNL1pVQNGQvQkjni_9f69ef0f98e633c1f87da8672b63071d2f5f669e)](https://dl.circleci.com/status-badge/redirect/circleci/34vMYXApuzs6spAruM7wQy/XJUYmpS259qnjU8ZtHAxPN/tree/main)

This is a Craft 3 website.

Requirements
------------
To run this website locally you will need [Docker](https://www.docker.com/products/docker-desktop). You can install them on macOS using
[Homebrew](https://brew.sh).
```bash
$ brew install docker-desktop
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
Optionally you can configure values for `FORWARD_APP_PORT` and `FORWARD_DB_PORT` if you do not with to use the standard ports. By default,
the application will be available at [http://127.0.0.1:8080]() and the database at [127.0.0.1:5432](). To run the application:
```bash
$ composer install
$ ./craft setup/security-key
$ yarn install
$ docker-compose up

# Optionally you can pull down the production database
$ composer sync-database
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
