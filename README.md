# Short Shadows
[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/34vMYXApuzs6spAruM7wQy/XJUYmpS259qnjU8ZtHAxPN/tree/main.svg?style=svg&circle-token=CCIPRJ_17ckPKwNL1pVQNGQvQkjni_9f69ef0f98e633c1f87da8672b63071d2f5f669e)](https://dl.circleci.com/status-badge/redirect/circleci/34vMYXApuzs6spAruM7wQy/XJUYmpS259qnjU8ZtHAxPN/tree/main)

This is a Craft 3 website.

### macOS
Install [Homebrew](https://brew.sh), then install brew packages by running this in the repo dir: 
```shell
$ brew bundle
```
[Configure your shell](https://asdf-vm.com/guide/getting-started.html#_3-install-asdf) for asdf. You will need to restart your terminal session.
```shell
$ open /Applications/OrbStack.app
```

### Windows
Make sure you're up-to-date with Windows Updates. Open Command Prompt/Windows Terminal and set up WSL:
```shell
$ wsl --install -d Ubuntu
$ shutdown /r /t 0
```
Once WSL is configured and running, run these commands in Ubuntu:
```shell
$ sudo add-apt-repository -y ppa:rmescandon/yq
$ sudo apt install -y git curl yq keychain unzip
$ git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.14.0
# Install packages required to build PHP:
$ curl -s https://raw.githubusercontent.com/asdf-community/asdf-php/master/.github/workflows/workflow.yml | yq eval '.jobs.plugin-test-docker.steps[] | select(.name == "Install packages").run' - | sed 's/apt-get/sudo apt-get/g' | bash
# Set up an SSH key for Github access: (alternatively import an existing key pair into ~/.ssh)
$ ssh-keygen -t ed25519 && echo -e "\nPublic key:\n" && cat ~/.ssh/id_ed25519.pub
# Copy the public key and add it to your Github account
# Configure the shell for asdf and keychain (automatically load all ed_25519 keys):
$ echo -e '\n. "$HOME/.asdf/asdf.sh"\n\nkeys=($(for k in ~/.ssh/id_ed25519*; do f=$(basename $k); if [[ -f $k && ! $f =~ \. ]]; then echo $f; fi; done))\neval `keychain -q --agents ssh --eval ${keys[@]}` ' >> ~/.bashrc
```
Install [Docker Desktop](https://docs.docker.com/desktop/install/windows-install/) then reboot.
In Ubuntu:
```shell
$ git clone <repo-url>
$ cd vanish
```
[VSCode](https://code.visualstudio.com) makes [developing in WSL](https://code.visualstudio.com/docs/remote/wsl) quite easy.

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
