const mqtt = require('mqtt');
// set true para usar el script con la app en Heroku
let production = false;
const broker = production ? 'mqtt://test.mosquitto.org' : 'mqtt://localhost';
const client = mqtt.connect(broker);
// const client  = mqtt.connect('mqtt://localhost');

client.on('connect', () => {
    console.log(`Arduino connected to ${broker}`);
    setInterval(() => {
      // publish data to broker every 2 seconds
      let randomTemp = Math.random() * (30 - 5) + 5;
      const data = {
        sensor: '5d81b342898a4d16d17f6c7d',
        value: randomTemp.toFixed(2)
      };
      let json = JSON.stringify(data);
      client.publish('temp-vivero-inet', json);
    }, 12000);
  });
