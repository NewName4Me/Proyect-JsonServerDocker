#!/bin/bash

# instalaciones
sudo apt update -y
sudo apt upgrade -y
sudo apt install -y nodejs npm git apache2 apache2-utils openssl
sudo npm i -g json-server
sudo npm i -g n
sudo n latest
sudo systemctl restart apache2

# tomar todo del repositorio
sudo git clone https://github.com/NewName4Me/Proyect-JsonServerDocker.git /tmp/mi_repositorio

# instalar docker
sudo apt-get update -y
sudo apt-get install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update -y
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

#configuracion servidor apache con pagina web
sudo rm -rf /var/www/html/* 
sudo cp -r /tmp/mi_repositorio/client/ /var/www/html/

#agregar configuracion del servidor para que use el dominio que necesitamos
echo "<VirtualHost *:80>
    ServerAdmin mail@codewithsusan.com
    DocumentRoot /var/www/

    <Directory /var/www/>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined

    <IfModule mod_dir.c>
        DirectoryIndex index.html index.php
    </IfModule>
</VirtualHost>" | sudo tee /etc/apache2/sites-available/tortarod.shop.conf
cd /etc/apache2/sites-available/
sudo a2ensite tortarod.shop.conf
sudo systemctl reload apache2

#configurar para ssl
sudo mkdir -p /etc/apache2/ssl/tortarod.shop
sudo cp /tmp/certificate.crt /etc/apache2/ssl/tortarod.shop/certificate.crt
sudo cp /tmp/private.key /etc/apache2/ssl/tortarod.shop/private.key
sudo cp /tmp/ca_bundle.crt /etc/apache2/ssl/tortarod.shop/ca_bundle.crt
sudo chmod 600 /etc/apache2/ssl/tortarod.shop/private.key
sudo a2enmod ssl
sudo a2enmod headers
echo "<VirtualHost *:80>
    ServerName tortarod.shop
    ServerAlias www.tortarod.shop
    Redirect permanent / https://tortarod.shop/
</VirtualHost>

<VirtualHost *:443>
    ServerName tortarod.shop
    ServerAlias www.tortarod.shop
    DocumentRoot /var/www/html
    
    SSLEngine on
    SSLCertificateFile /etc/apache2/ssl/tortarod.shop/certificate.crt
    SSLCertificateKeyFile /etc/apache2/ssl/tortarod.shop/private.key
    SSLCertificateChainFile /etc/apache2/ssl/tortarod.shop/ca_bundle.crt

    <Directory /var/www/html>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    SSLProtocol all -SSLv3 -TLSv1 -TLSv1.1
    SSLCipherSuite ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384
    SSLHonorCipherOrder off
    SSLSessionTickets off

    Header always set Strict-Transport-Security "max-age=63072000"
</VirtualHost>" | sudo tee /etc/apache2/sites-available/tortarod.shop.conf
sudo a2ensite tortarod.shop.conf
sudo a2dissite 000-default.conf
sudo apache2ctl configtest
sudo systemctl restart apache2

# ejecutar Dockerfile en carpeta db(esto debe ejecutarse al final siempre)
cd /tmp/mi_repositorio/db/
sudo docker build -t json-server-multi .
sudo docker run --rm -p 3000:3000 -p 3001:3001 -p 3002:3002 json-server-multi
