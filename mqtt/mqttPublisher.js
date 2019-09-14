const mqtt = require('mqtt');
const client  = mqtt.connect('mqtt://localhost');

client.on('connect', () => {
    setInterval(() => { client.publish('hola', '24.5'); }, 2000);
  });
