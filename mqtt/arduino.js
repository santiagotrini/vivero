const mqtt = require('mqtt');
const client  = mqtt.connect('mqtt://localhost');

client.on('connect', () => {
    setInterval(() => {
      // publish data to broker every 2 seconds
      const data = {
        sensor: '',
        value: Math.random() * 30
      };
      let json = JSON.stringify(data);
      client.publish('temp', json);
    }, 12000);
  });
