# chat-app
Demostracion basica de un chat desarrollado con React + NodeJS + Socket.io

# VISION GENERAL

El fin es solo mostrar como tener una arquitectura para armar un chat con estas tecnologias.

## API

Por default, el API corre por el puerto :3000. 
En el archivo, development.json agregar las credenciales para la base de datos donde se crearan las tablas. Esta API la hice con el dialecto para PostgreSQL, pero si deseas cambiarlo puedes ir a api/database/index.js
y quizas haga falta hacer algo mas, verificalo en la documentacion de sequelize https://sequelize.org/

```
npm install
npm start
```
Despues de haber lanzado estos comandos ya el API esta corriendo. Puedes ver la documentacion en http://localhost:3000/api-docs :).

### FRONT

Es una aplicacion de create-react-app asi que solo necesitas:

```
npm install
npm start
```

En este archivo de configuracion src/config/development.js agregar la URL donde esta corriendo el API.

### HOW TO TEST

Crea un par de usuarios con Postman o con cualquier otra cosa, inicia sesiones en navegadores diferentes.

La ruta para iniciar sesion en front es: /login, luego de eso puedes ir a /chats, crear un chat con el otro usuario que creaste y listo, pruebalo :)
