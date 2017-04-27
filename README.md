# Nodepop
#### Hands-On curso node.js

Aplicación sencilla donde ofreceremos una API para acceder a unos anuncios básicos ya creados.

## Getting started
Las siguientes instrucciones te permitirán ejecutar una copia del proyecto en tu ordenador.

### Prerequisitos
Debe de estar instalado el siguiente software
* [node.js](https://nodejs.org/en/) - Versión 6.10.0 o superior.
* [MongoDB](https://www.mongodb.com/download-center?jmp=nav#community) - Versión 3.4.4.

Una versión superior de MongoDB está contemplada, pero será necesario cambiar ```lib/db/start_mongo.bat``` si se quiere que funcione el script de arranque de la base de datos.

### Instalación
En la **raíz del proyecto** y en una ventana de comandos donde el entorno ha sido configurado para usar node.js, ejecutar el siguiente comando:
```
npm install
```
Después, se puede iniciar el proyecto y dejarlo listo para ser usado con:
```
npm run fresh_start_db
```

### Despliegue
Existen comandos **adicionales** para iniciar el proyecto según unas circunstancias distintas

* Iniciar únicamente el servidor: ``` npm run start ```
* Arrancar la base de datos: ```npm run init_db```
* Restaurar los valores originales de la base de datos: ``` npm run reset_db```
* Ejecutar el proyecto entero sin restaurar la base de datos: ```npm run start_db```
* Ejecutar el proyecto entero restaurando la base de datos: ```npm run fresh_start_db```

## API
Todas las respuestas, a no ser que sean para informar de un error, serán objetos JSON.

### Anuncios
```
GET http://host:3000/anuncios
```
```
GET http://host:3000/anuncios?tag=lifestyle&venta=false
```
Para poder obtener respuesta, es necesario el uso de un **token** que será dado al usuario una vez se haya registrado y autenticado.
```
GET http://host:3000/anuncios?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvX2lkIjoiNThmZjM23jAyNzE1YjBxZDU0ZWExMDdjIiwiaWF0IjoxNDkzMTowOTAwLCJleHAiOjE0OTMyOTM3MDB9.Wa4CARJl7J4LRjnXUHkQ9JGwHxw-I2YaxY_mxCAZFj0
```
##### Filtros
Filtros disponibles para usar como parámetros en la petición ```GET```:
* **tag**: ```lifestyle```, ```motor```, ```mobile``` o ```work```
* **venta**: ```true``` o ```false```
* **nombre**: Hará una búsqueda de prefijo con el valor ```nombre```
* **precio**: Entre precios ```x-y```, mayor que ```x-```, menor que ```-x```, precio exacto ```x```
* **start**: offset de resultados devueltos
* **limit**: límite de resultados devueltos
* **sort**: ordenar resultados según alguno de los filtros
* **token**: JSWebToken obtenido de la autenticación

### Usuarios
#### Registro
```
POST http://host:3000/usuarios/registro
```
Parámetros:
* Nombre
* Email
* Clave

Respuesta: JSON(success, usuario) o error.

#### Autenticación
```
POST http://host:3000/usuarios/authenticate
```
Parámetros:
* Email
* Clave

Respuesta: JSON(success, token) o error.


## Herramientas
* [node.js](https://nodejs.org/es/) - Entorno de Javascript para el desarrollo del servidor.
* [npm](https://www.npmjs.com/) - Gestor de paquetes y módulos de node.js.
* [express.js](http://expressjs.com/es/) - Módulo para la creación de la API del servidor.
* [MongoDB](https://www.mongodb.com/es) - Base de datos NoSQL.