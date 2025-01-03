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

# ejecutar Dockerfile en carpeta db(esto debe ejecutarse al final siempre)
cd /tmp/mi_repositorio/db/
sudo docker build -t json-server-multi .
sudo docker run --rm -p 3000:3000 -p 3001:3001 -p 3002:3002 json-server-multi