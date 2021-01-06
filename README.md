## IDE Principal

Todo el desarrollo se ha realizado mediante el uso de Visual Studio Code
Esta herramienta permite el desarrollo de caracter nativo mediante el uso del superset TypeScripc

[Visual Studio Code](https://ionicframework.com/docs/components) VSC.

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## 1) Copiar carpeta

Descomprimir la carpeta denominda api-plataforma en la ubicación que desee.
Moverse a la raiz de la carpeta:

```bash
# Comando para ubicarse en la raiz de la API-REST
$ cd api-plataforma
```

## 2) Instalación de API nivel pruebas

```bash
# Comando que instala  todas las librerías necesarias para ejecutar la API-REST
$ npm i
```

## 3) Levantar el servicio de la API

```bash
# Comando para ejecutar pm2
$ npx pm2 restart pm2.json
```

Ejecutando este comando se levantará el servicio denominado PM2.
Este servicio permite ejecutar nodejs

![alt text](./assets/pm2_ejecucion.jpg)

El gráfico superior muestra PM2 ya ejecutado y en espera de comunicación desde la capa del cliente.

## 4) Levantar el servicio Peerjs

### 1) Instalar en el servidor
```bash
# Comando para instalar peerjs a nivel global
$ npm i -g peerjs
```

### 2) Ejecutar el servidor peerjs
```bash
# Comando para ejecutar peerjs
$  peerjs --port 3001
```
Este comando indica que se ejecutará peerjs en el puerto 3001. La API sirve para establecer comunicación P2P entre dos puntos.

Ejecutado el comando enviará el siguiente mensaje:

```bash
# mensaje enviado por peerjs indicando que el servicio está siendo ejecutado
Started PeerServer on ::, port: 3001, path: / (v. 0.6.1)
```

## Repositorio

Todo el código fuente se encuetra en:

[GitHub - API Plataforma](https://github.com/DM-UOC/api-plataforma/tree/desarrollo_nestjs) Repositorio para la API del sistema de plataforma de educación
