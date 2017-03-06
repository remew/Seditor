# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/xenial64"
  config.vm.provider :virtualbox do |vbox|
      vbox.name = "seditor-virtual-server"
  end

  config.vm.network "forwarded_port", guest: 80, host: 8080
  # config.vm.network "private_network", ip: "192.168.56.100"

  config.vm.synced_folder ".", "/host"

  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
  end

  config.vm.provision "shell", inline: <<-SHELL
    timedatectl set-timezone Asia/Tokyo
    apt-get update
    apt-get install -y language-pack-ja
    sed -i 's/en_US/ja_JP/g' /etc/default/locale
    apt-get install -y postgresql
    curl https://nginx.org/keys/nginx_signing.key > /tmp/nginx_signing.key
    apt-key add /tmp/nginx_signing.key
    echo "deb http://nginx.org/packages/ubuntu/ xenial nginx" >> /etc/apt/sources.list
    echo "deb-src http://nginx.org/packages/ubuntu/ xenial nginx" >> /etc/apt/sources.list
    apt-get update
    apt-get install -y nginx
  SHELL
end

