Vagrant.require_version ">= 2.1.4"

Vagrant.configure("2") do |config|
  config.vagrant.plugins = ["vagrant-env", "vagrant-hostmanager"]

  # enable and configure plugins
  config.env.enable
  config.hostmanager.enabled = true
  config.hostmanager.manage_host = true
  config.hostmanager.ip_resolver = proc do |vm, resolving_vm|
    if vm.id
      `VBoxManage guestproperty get #{vm.id} "/VirtualBox/GuestInfo/Net/1/V4/IP"`.split()[1]
    end
  end

  config.vm.box = "scotch/box-pro"
  config.vm.network "private_network", ip: nil, type: "dhcp"
  config.vm.hostname = ENV["HOSTNAME"]
  config.vm.synced_folder ".", "/var/www", :mount_options => ["dmode=777", "fmode=777"]

  config.vm.provision "shell", keep_color: true, inline: <<-'SHELL'
    # Use dhcp on eth1
    sed -i -z "s,addresses\:.*,dhcp4: true\n,g" /etc/netplan/99-vagrant.yaml
    # Renew eth1 IP
    dhclient -r eth1 && dhclient eth1

    echo "Installing Heroku CLI, this will take a minute or two..."
    snap install heroku --classic

    # Add repositories to get PostgreSQL 10
    echo "deb http://apt.postgresql.org/pub/repos/apt/ zesty-pgdg main" >> /etc/apt/sources.list.d/pgdg.list
    wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | sudo apt-key add -

    # Install php-soap, swap to fish shell, install postgresql-10
    apt-get update
    apt-get install -y jq postgresql-10 fish 2> /dev/null
    # Swap to fish shell
    sed -i -z "s,\/home\/vagrant:\/bin\/bash,/home/vagrant:/usr/bin/fish,g" /etc/passwd

    # Take ownership of some files
    chown -R vagrant:vagrant /usr/local/bin /home/vagrant/.nvm
    # Upgrade composer
    composer self-update

    # Upgrade postgres
    pg_dropcluster 10 main --stop
    pg_upgradecluster -m upgrade 9.6 main
    pg_dropcluster 9.6 main --stop

    # Open up access to postgres
    echo "host    all             all             all                     password" >> /etc/postgresql/10/main/pg_hba.conf
    echo "listen_addresses = '*'" >> /etc/postgresql/10/main/postgresql.conf
    sudo -u postgres psql postgres -c "ALTER USER root CREATEDB;"  > /dev/null
    service postgresql restart

    # Point Apache at /var/www/web instead of /var/www/public
    sed -i s,/var/www/public,/var/www/web,g /etc/apache2/sites-available/000-default.conf

    # Set timezone in PHP
    find /etc/php/7.2 -type f -name "php.ini" -exec sed -i "s,;date.timezone =,date.timezone = 'Australia/Melbourne',g" {} \;
    # Set sendmail_path (defaults to /usr/sbin/sendmail -t -i)
    find /etc/php/7.2 -type f -name "php.ini" -exec sed -i "s,;sendmail_path =,sendmail_path = /usr/bin/sendmail -t -i,g" {} \;
    service apache2 restart

    # Clean up system node symlnks
    rm /usr/bin/node /usr/bin/npm
  SHELL

  # Run hostmanager plugin again as the VM's IP will have changed
  config.vm.provision :hostmanager

  # Add local SSH key to authorised keys on box
  ssh_pub_key = File.readlines("#{Dir.home}/.ssh/id_rsa.pub").first.strip
  config.vm.provision "shell", inline: "echo #{ssh_pub_key} >> /home/vagrant/.ssh/authorized_keys", privileged: false

  config.vm.provision "shell", keep_color: true, privileged: false, inline: <<-'SHELL'
    # Get latest nvm
    cd ~/.nvm; git fetch origin v0.33.11; git fetch; git checkout v0.33.11

    # Download fisher
    curl -Lo ~/.config/fish/functions/fisher.fish --create-dirs https://git.io/fisher

    # Configure fish shell: clear default greeting, always show full path in prompt
    fish -c 'set -U fish_greeting; and set -U fish_prompt_pwd_dir_length 0'
    # Put snap binaries on PATH
    fish -c 'echo set -gx PATH \$PATH /snap/bin >> ~/.config/fish/config.fish'

    # Install fish nvm wrapper
    fish -c 'fisher add FabioAntunes/fish-nvm'
    # Install node
    fish -c 'nvm deactivate'
    fish -c 'nvm uninstall 8.9.4'
    fish -c 'cd /var/www; and nvm install; and nvm alias default stable'
    # Install npm and npm-check
    fish -c "npm install -g npm@(jq -r '.engines.npm' /var/www/package.json) npm-check"
  SHELL
end
