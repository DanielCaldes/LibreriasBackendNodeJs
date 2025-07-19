# To-Do App API

En este proyecto, se ha desarrollado una API REST para la gestión de tareas (*to-do list*) utilizando **Node.js** y **Express**, con almacenamiento en archivos **JSON**, validación con **Joi**, autenticación con **JWT** y manejo de concurrencia mediante **mutex**.

## Características

- **API REST** para la gestión de tareas con CRUD completo.  
- **Persistencia en JSON**: Lectura y escritura de tareas en el fichero `tasks.json`.  
- **Validación de datos** utilizando Joi para asegurar integridad y formato correcto.  
- **Autenticación y autorización** mediante JWT para proteger las operaciones de creación, actualización y eliminación.  
- **Middleware global de registro de solicitudes** con Morgan.  
- **Middleware global de manejo de errores** para devolver respuestas JSON claras y estandarizadas.  
- **Uso de mutex** para evitar condiciones de carrera al acceder y modificar el archivo JSON.  
- Variables de configuración gestionadas con **dotenv**.

## Requisitos

- Node.js  
- Permisos de lectura y escritura en el directorio del proyecto

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/DanielCaldes/LibreriasBackendNodeJs.git
   cd LibreriasBackendNodeJs
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Crear el archivo `.env` basado en `.env.example` y configurar las variables:

   ```env
   JWT_SECRET=tu_secreto_jwt
   JWT_EXPIRES_IN=1h
   PORT=3000
   DATA_DIR=./data
   ```

4. Iniciar el servidor:

   ```bash
   npm start
   ```

5. La API estará disponible en:

   ```
   http://localhost:3000
   ```

## Estructura del proyecto

```
to-do-app/
├── data/
│   └── tasks.json              # Archivo donde se almacenan las tareas (persistencia simulada)
├── middlewares/
│   ├── validateTask.middleware.js  # Middleware para validar datos de tareas con Joi
│   ├── errorHandler.middleware.js  # Middleware global para manejo centralizado de errores
│   └── auth.middleware.js           # Middleware para validar tokens JWT y proteger rutas
├── routes/
│   ├── auth.routes.js              # Rutas relacionadas con autenticación (/api/login)
│   └── tasks.routes.js             # Rutas CRUD para gestionar tareas (/api/tasks)
├── controllers/
│   ├── auth.controller.js          # Lógica para autenticación mediante generación de tokens
│   └── tasks.controller.js         # Lógica para manejar las operaciones CRUD de tareas
├── utils.js                       # Funciones útiles para lectura/escritura JSON y manejo archivos
├── config.js                      # Configuración centralizada (constantes de inicialización de datos)
├── app.js                         # Archivo principal que configura Express y middlewares
├── index.js                       # Punto de entrada que inicia el servidor
├── package-lock.json              # Archivo generado automáticamente con versiones exactas de dependencias
├── package.json                   # Archivo con dependencias y scripts del proyecto
└── .env.example                   # Ejemplo de archivo .env para configurar variables de entorno
```

## Endpoints principales

### Tareas

#### 1. Listar todas las tareas

- **Método**: GET  
  ```url
  /api/tasks
  ```
- **Descripción**: Devuelve un arreglo con todas las tareas almacenadas.  
- **Respuesta ejemplo**:

  ```json
  [
    {
      "id": 1,
      "title": "Comprar leche",
      "description": "Ir al supermercado a comprar leche",
      "limitDate": "2025-07-25",
      "completed": false
    },
    {
      "id": 2,
      "title": "Estudiar para examen",
      "description": "",
      "limitDate": "2025-07-30",
      "completed": false
    }
  ]
  ```

#### 2. Obtener tarea por ID

- **Método**: GET  
  ```url
  /api/tasks/:id
  ```
- **Descripción**: Devuelve la tarea que coincida con el ID proporcionado.  
- **Respuesta ejemplo**:

  ```json
  {
    "id": 1,
    "title": "Comprar leche",
    "description": "Ir al supermercado a comprar leche",
    "limitDate": "2025-07-25",
    "completed": false
  }
  ```

#### 3. Crear una nueva tarea

- **Método**: POST  
  ```url
  /api/tasks
  ```
- **Descripción**: Crea una nueva tarea. Requiere autenticación con JWT.  
- **Cuerpo de la solicitud** (JSON):

  ```json
  {
    "title": "Título de la tarea",
    "description": "Descripción opcional",
    "limitDate": "YYYY-MM-DD",
    "completed": false
  }
  ```
- **Respuesta**:

  ```json
  {
    "id": 3,
    "title": "Título de la tarea",
    "description": "Descripción opcional",
    "limitDate": "YYYY-MM-DD",
    "completed": false
  }
  ```

#### 4. Actualizar una tarea

- **Método**: PUT  
  ```url
  /api/tasks/:id
  ```
- **Descripción**: Actualiza la tarea con el ID indicado. Requiere autenticación con JWT.  
- **Cuerpo de la solicitud** (JSON):

  ```json
  {
    "title": "Nuevo título",
    "description": "Nueva descripción",
    "limitDate": "YYYY-MM-DD",
    "completed": true
  }
  ```

- **Respuesta**:

  ```json
  {
    "id": 3,
    "title": "Nuevo título",
    "description": "Nueva descripción",
    "limitDate": "YYYY-MM-DD",
    "completed": true
  }
  ```

#### 5. Eliminar una tarea

- **Método**: DELETE  
  ```url
  /api/tasks/:id
  ```
- **Descripción**: Elimina la tarea con el ID indicado. Requiere autenticación con JWT.  
- **Respuesta**:

  ```json
  {
    "message": "Tarea /* Comprar leche */ (ID: 1) eliminada con éxito"
  }
  ```

## Middleware y funcionalidades adicionales

- **Morgan** para registro global de solicitudes HTTP.  
- **Joi** para validación de los datos recibidos en la creación y actualización de tareas.  
- **jsonwebtoken** para generación y validación de tokens JWT.  
- **Middleware global de manejo de errores** para capturar errores y responder con JSON adecuado.  
- **Mutex** para evitar condiciones de carrera en el acceso a `tasks.json`.  
- **Funciones utilitarias** en `utils.js` para lectura/escritura de JSON y creación/aseguramiento del archivo `tasks.json`.

## Variables de entorno

En el fichero `.env` deben definirse las siguientes variables:

- `JWT_SECRET`: secreto para firmar los tokens JWT (dato sensible).  
- `JWT_EXPIRES_IN`: duración de validez del token (por ejemplo, "1h").  
- `PORT`: puerto donde se ejecuta el servidor.  
- `DATA_DIR`: directorio donde se almacena el archivo `tasks.json`.

Se incluye un archivo `.env.example` para facilitar la creación del archivo `.env`.

## Concurrencia y Mutex

Para evitar condiciones de carrera al modificar el archivo JSON de tareas, se ha implementado un sistema de mutex que garantiza exclusión mutua al leer y escribir el fichero.

## Conclusiones

Este proyecto cumple con los requisitos del enunciado para la creación de una API REST con un CRUD completo, validación de datos, autenticación JWT, gestión de variables de entorno y manejo adecuado de errores y concurrencia. Además, se ha incluido el registro de solicitudes con Morgan para facilitar el monitoreo y depuración.

## Licencia

Este proyecto está bajo la Licencia MIT.
