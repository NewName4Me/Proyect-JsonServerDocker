# Tienes el código javascript en los siguientes directorios: 

## Para desplegar las "bases de datos": (tendrás que ejecutar cada uno de los json-server en una terminal diferente)

    + npm i -g json-server
    + npx json-server -p 3000 ./db/users.json
    + npx json-server -p 3001 ./db/meals.json
    + npx json-server -p 3002 ./db/categories.json

### ***Todo se encuentra dentro de la carpeta "client":***

    + Carpeta "config" => un archivo env.js donde se almacenan las rutas que tienen acceso a las tres "Bases de datos" (meals, users, categories)
    
    + Dentro de src tienes la carpeta js que contiene:
        
        * Controladores
        * Repositorios
        * Entidades
        * Funciones de utilidad (se usan a lo largo de todas las vistas)

    + Dentro de la carpeta "views", hay una serie de carpetas con todas las vistas de la página, dentro de cada carpeta hay un app.js específico para la funcionalidad básica de dicha vista

    + Directorio raiz de src, un solo app.js que maneja funciones básicas de la página de recibimiento