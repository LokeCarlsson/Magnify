#! /bin/bash

apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
apt-get update
apt-get install -y mongodb-org
cp /etc/vagrant/mongodb.service /etc/systemd/system/mongodb.service
sudo systemctl enable mongodb
systemctl start mongodb
export LC_ALL=C
