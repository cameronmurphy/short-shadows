Vagrant.require_version ">= 2.1.4"

Vagrant.configure("2") do |config|
  config.vagrant.plugins = %w(vagrant-hostmanager)

  config.hostmanager.enabled = true
  config.hostmanager.manage_host = true
  config.hostmanager.ip_resolver = proc do |vm|
    if vm.id
      `VBoxManage guestproperty get #{vm.id} "/VirtualBox/GuestInfo/Net/1/V4/IP"`.split[1]
    end
  end

  config.vm.box = "camurphy/cappuccino"
  config.vm.network "private_network", type: "dhcp"
  config.vm.hostname = "short-shadows.wip"
  config.vm.synced_folder ".", "/var/www", :mount_options => %w(dmode=777 fmode=777)

  # Copy across private key for production sync
  config.vm.provision "file", source: "~/.ssh/id_rsa", destination: ".ssh/id_rsa"

  config.vm.provision "shell", inline: <<-'SHELL'
    # Craft recommends max execution time of 120 seconds
    sed -i "s,max_execution_time = [[:digit:]]*,max_execution_time = 120,g" /etc/php.ini

    # Swap from public/ to web/ for hosting
    sed -i "s,/var/www/public,/var/www/web,g" /etc/httpd/conf.d/000-default.conf
    systemctl restart httpd.service
  SHELL

  config.vm.provision "shell", keep_color: true, privileged: false, inline: <<-'SHELL'
    composer global require sllh/composer-versions-check
    npm install -g yarn
  SHELL
end
