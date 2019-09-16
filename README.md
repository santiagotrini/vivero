# Vivero IoT

Ejercicio de las olimpiadas de informatica del INET 2017

## Instalacion

Instrucciones para instalar en Arch Linux.

### Instalar NodeJS y Mosquitto (broker MQTT)
```
$ sudo pacman -S mosquitto nodejs
```

### Instalar MongoDB
```
$ yay -S mongodb-bin
```

### Iniciar broker MQTT y Mongo
```
$ systemctl start mongodb
$ systemctl start mosquitto
```

### Clonar repo e instalar dependencias
```
$ git clone https://github.com/santiagotrini/vivero.git
$ cd vivero
$ npm i
```

### Iniciar web app
```
$ npm run dev
```

Ir a http://localhost:3000
