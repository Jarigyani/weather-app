#!/bin/bash
yum install -y yum-utils

yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

yum install -y docker-ce docker-ce-cli containerd.io

systemctl start docker

systemctl enable docker

curl -L "https://github.com/docker/compose/releases/download/1.28.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

chmod +x /usr/local/bin/docker-compose

ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

firewall-cmd --zone=public --add-service=http --permanent

firewall-cmd --zone=public --add-port=443/tcp --permanent

firewall-cmd --reload

cat << EOF > ~/docker-compose.yml
version: '3.3'
services:
  https-portal:
    image: steveltn/https-portal:latest
    ports:
      - '80:80'
      - '443:443'
    links:
      - wordpress
    restart: always
    environment:
      DOMAINS: '$1.neec-ss14.click -> http://wordpress'
      STAGE: 'production'
      # FORCE_RENEW: 'true'

  wordpress:
    image: wordpress
    environment:
      - WORDPRESS_DB_HOST=mysql
      - WORDPRESS_DB_USER=wordpress
      - WORDPRESS_DB_PASSWORD=wordpress
      - WORDPRESS_DB_NAME=wordpress
    depends_on:
      - mysql
    restart: always

  mysql:
    image: mysql:5.7
    environment:
      - MYSQL_ROOT_PASSWORD=wordpress
      - MYSQL_USER=wordpress
      - MYSQL_PASSWORD=wordpress
      - MYSQL_DATABASE=wordpress
    restart: always
EOF

docker-compose -f ~/docker-compose.yml up
exit 0
