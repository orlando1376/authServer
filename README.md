# Auth-Server

[Gracias a Fernando Herrera por este curso](https://www.udemy.com/course/angular-fernando-herrera/learn/lecture/24320320#questions)

Esta App es un servidor hecho en Node para autenticación y validación de usuarios

## Instalación de paquetes

``` code
npm i bcryptjs cors dotenv express express-validator jsonwebtoken mongoose
````

- `bcryptjs`: Para encriptar y hacer hash de contraseñas
- `cors`: Para hacer peticiones cross-domain
- `dotenv`: Para configurar variables de entorno
- `express`: Para montar servidor de servicios REST
- `express-validator`: Para hacer validaciones
- `jsonwebtoken`: para crear jsonwebtoken
- `mongoose`: ORM para interactuar con mongoo

## Temas puntuales

- Fundamentos de Node
- REST Services
- JWT
- MongoDB - Mongo Atlas
- Express framework
- Express validator
- CRUD
- Validaciones
- Modelos de base de datos
- Encriptar contraseñas

## Iniciar servidor

``` code
npm run dev
````

## Instalación de Mongo

[Mongo](https://www.mongodb.com/es/cloud/atlas) es una base de datos no relacional y documental, lo que significa que almacena datos en forma de documentos tipo JSON.

## Información de JsonWebToken

En la página de [jwt.io](https://jwt.io/) encontraremos toda la documentación necesaria sobre JWT.
Un JWT está compuesto por:

- HEADER
- PAYLOAD
- SIGNATURE

## Despliegue en Heroku

Para desplegar la aplicación en [Heroku](https://www.heroku.com/) debemos hacer algunos ajustes:

- Colocar el build de producción de la aplicación de Angualr en el directorio `public`
- Corregir la ruta de `dashboard` bien sea en Angualr o en Node
- Crear archivo .gitignore y colocar `node_modules/` para no copiar estos archivos
- Configurar script de inicio en el archivo `package.json`, aquí debemos colocar `"start": "node index.js"`
- En la aplicación de Angular actualizar la variable de producción `baseUrl` con la url de la aplicación en Heroku

### Instalar Heroku

- En windows descargar e instalar aplicación
- Ejecutar: `heroku login`
- Ubicarse en el directorio de la aplicación
- Ejecutar los comandos:

``` code
git init
heroku git:remote -a directorio_aplicacion
git add.
git commit -am "Mensaje"
git push heroku master
```
