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

## Usuario admin

```
user: admin
password: 1234
```

Recomendacion, instalar Postman `$ yay -S postman` para testear API.

### Deploy a Heroku

Hacerse una cuenta en [Heroku](https://www.heroku.com) e instalar la CLI de Heroku.

```
$ yay -S heroku-cli
```

Necesitas un `Procfile` para que Heroku sepa como iniciar tu app.

```
$ echo "web: npm start" > Procfile
```

Desde la terminal: logearse, crear la app y pushear a Heroku

```
$ heroku login
$ heroku create nombre-de-app
$ git push heroku master
```

Desde el dashboard de Heroku en el navegador setear una variable de configuracion con el nombre de `MONGODB_URI` y darle el valor de tu base de datos en mLab o algun proveedor similar.

Por ultimo ir a https://nombre-de-app.herokuapp.com para ver el resultado.
