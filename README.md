Short Shadows
===========
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
$ cd /var/www
$ composer install
$ ./craft setup/security-key
$ npm install
```

Code standards
--------------
The tools `eslint` and `sass-lint` are used to ensure `*.js` and `*.scss` files meet the code standards. Use the
commands `npm run lint-js` and `npm run lint-scss` to lint the codebase. 
