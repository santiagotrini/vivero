const mqtt = require('mqtt');
const client  = mqtt.connect('mqtt://localhost');

client.on('connect', () => {
    setInterval(() => {
      // publish data to broker every 2 seconds
      client.publish('temp', '24.5');
    }, 2000);
  });
