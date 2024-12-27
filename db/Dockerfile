# Usa la imagen base de Debian
FROM debian:latest

# Configurar el directorio de trabajo dentro del contenedor
WORKDIR /app

# Instalar Node.js, npm y json-server
RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g json-server \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copiar los archivos JSON al contenedor
COPY meals.json users.json categories.json /app/

# Exponer los puertos para json-server
EXPOSE 3000 3001 3002

# Configurar el comando predeterminado para ejecutar json-server en cada archivo JSON
CMD \
    json-server --watch users.json --port 3000 & \
    json-server --watch meals.json --port 3001 & \
    json-server --watch categories.json --port 3002 && \
    wait
