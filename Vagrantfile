Vagrant.require_version ">= 2.1.4"

Vagrant.configure("2") do |config|
  config.vagrant.plugins = ["vagrant-env", "vagrant-hostmanager"]

  config.env.enable
  config.hostmanager.enabled = true
  config.hostmanager.manage_host = true
  config.hostmanager.ip_resolver = proc do |vm, resolving_vm|
    if vm.id
      `VBoxManage guestproperty get #{vm.id} "/VirtualBox/GuestInfo/Net/1/V4/IP"`.split()[1]
    end
  end

  config.vm.box = "camurphy/cappuccino"
  config.vm.network "private_network", type: "dhcp"
  config.vm.hostname = ENV["HOSTNAME"]
  config.vm.synced_folder ".", "/var/www", :mount_options => ["dmode=777", "fmode=777"]

  # Copy across private key for production sync
  config.vm.provision "file", source: "~/.ssh/id_rsa", destination: ".ssh/id_rsa"

  # Swap from public/ to web/ for hosting
  config.vm.provision "shell", inline: <<-'SHELL'
    sed -i "s,/var/www/public,/var/www/web,g" /etc/httpd/conf.d/000-default.conf
    systemctl restart httpd.service
  SHELL
end
