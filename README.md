# Trabajo Final para la asignatura Sistema Distribuidos. 

## Contenido
- [Integrantes del grupo](#integrantes-del-grupo)
- [Tech Stack](#tech-stack)
- [Instalacion y uso](#instalacion-y-uso)
- [API y consideraciones del Backend](#api-y-consideraciones-del-backend)
- [MQTT](#mqtt)
- [Arduino](#arduino)
- [Promocion](#promocion)

## Integrantes del grupo
- Frangolini, Matias Nicolas
- Iarritu, Pedro
- Porfilio, Bernardo Esteban
- Santos Di Leo, Juan Federico

### Tech stack:
Backend
- HTTP de node para la API REST
- Express para la API REST requisito de promocion
- dotenv, para configuar variables de entorno
- nodemon, para demonizar el proceso y contar con hot reload ante modificaciones en los archivos.

Frontend
- Axios para las requests HTTP
- Vanilla JS, HTML

## Instalacion y uso
> **Aviso:**
> Debe contar con Node.js v20 o superior, mosquitto v2.0.19 o superior y Docker Desktop.
0. Clonar el repositorio
1. Ir al directorio del backend, `cd backend`
2. Ejecutar `npm i` para instalar las dependencias en el package.json
3. Ejecutar `npm run dev` para correr el script "dev" del package.json (nodemon).
4. Ir al directorio del frontend y repetir la instalacion de dependencias y ejecucion del script dev.
5. Desde la plataforma Arduino instalar el apartado `esp32` de placas para que reconozca las Wemos D1 R32
6. Compilar y subirle a todas las placas el codigo arduinoBT que se encuentra en el directorio `arduinoBT`
7. Levantar un contenedor en docker-file para hostear el broker Mosquitto
8. Ir al directorio principal y ejecutar en consola `docker-compose up --build`
9. Abrir un navegador web y acceder a `http://localhost:3001` para ver el frontend en acción.

## API y consideraciones del Backend:
La API base fue realizada en HTTP. 
Fue realizada con una arquitectura ruta, controlador, servicio, repositorio.
- Las **rutas** son los diferentes endpoints para los que la API tiene una respuesta, hay varias rutas en las que la aplicacion puede responder con distintos metodos HTTP (GET, PATCH, POST, DELETE). Cuando se utiliza una ruta que no es valida la API devuelve un 404.
- Los **controladores** procesan las requests que llegan a la API y devuelven al usuario el recurso o procedimiento solicitado. Ademas manejan las excepciones de las capas subyacentes para que ante una solicitud inadecuada el backend siga activo.
- Los **servicios** son los responsables de manejar la logica de negocio de la aplicacion. Verifican que las solicitudes cumplan los contratos y utilizan los repositorios para leer y modificar informacion de la base de datos.
- Los **repositorios** son los que realmente acceden a la informacion. Acceden a las bases de datos que en el caso de esta solucion son archivos JSON.

- Dentro de la carpeta **backend** se encuentra un archivo .env que permite modificar variables de entorno, por ejemplo el puerto HTTP de la API. Se utiliza dotenv para poder leer estas variables.

## MQTT:
- Configuracion MQTT: dentro del backend tambien se encuentra la conexion al broker y la suscripcion al topico checkpoint. El broker que utilizaremos sera Mosquitto. Esta conexion y suscripcion permite al backend poder leer los mensajes que escriben las placas wemos ubicadas en posiciones estrategicas del campo en el canal de MQTT y manejar la informacion que llega por estos mensajes como una solucion tipica de IoT lo requiere.
- MQTT Helper: esta clase sera la encargada de manejar la informacion que llegue al topico checkpoint por el canal MQTT. Utilizara tambien los servicios que usa la API ya que mantiene la misma logica de negocio de la aplicacion y ademas esta decision de arquitectura encapsula la logica para acceder a los datos.
- El broker sera levantado utilizando la herramienta Docker Desktop y un archivo docker-compose.yml. 

## ARDUINO
Dentro de la carpeta "arduinoBT" se encontrara el codigo que se debe cargar en las placas. Es un codigo compatible con placas Wemos D1 R32 que recomendamos que sea subido a la placa por la plataforma que brinda Arduino.
Este codigo debe ser previamente configurado ingresando los datos en todas las constantes char* que tienen declaradas el valor **"..."** de la red WiFi a la que estaran conectadas las placas (ssid y password). 
Ademas se debera configurar la direccion IP donde esta levantada el broker. 
El codigo se conectara a WiFi, luego al Broker y cada 10 segundos hara un scan de dispositivos Bluethoot BLE cercanos, luego publicara en el topico checkpoint mensajes con un mismo formato. 
- Cada mensaje contendra:
  - Numero de paquete 
  - Cantidad total de paquetes
  - Direccion MAC de la placa
  - Un arreglo de collares reconocidos en el rango de este checkpoint. Cada paquete contendra una cantidad configurable de animales en el arreglo, se adopto esta solucion para evitar que el buffer de la Wemos se llene.

## PROMOCION
Para acceder a la version de promocion que incluye la API implementada en Express.js, servicio de Log-In con autenticacion y un mapa donde se muestra la ubicacion de los animales.
  - Se debe obtener la rama promocion, ejecutando por consola `git fetch origin promocion`
  - Luego moverse a esa branch, con el comando `git checkout promocion`
  - Correr back y frontend.
