const mqtt = require('mqtt');
// set true para usar el script con la app en Heroku
let production = true;
const broker = production ? 'mqtt://test.mosquitto.org' : 'mqtt://localhost';
// console.log(broker);
const client = mqtt.connect(broker);
// const client  = mqtt.connect('mqtt://localhost');

client.on('connect', () => {
    console.log(`Arduino connected to ${broker}`);
    setInterval(() => {
      // publish data to broker every 12 seconds
      let randomHumidity = Math.random() * (100 - 5) + 5;
      // let randomTemp = Math.random() * (30 - 5) + 5;
      const data = {
        sensor: '5d804ce3d100c20017e956a9',  // id del sensor
        value: randomHumidity.toFixed(0)
      };
      let json = JSON.stringify(data);
      // podria publicar a distintos topicos
      client.publish('temp-vivero-inet', json);
    }, 12000);
  });
