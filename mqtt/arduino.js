const mqtt = require('mqtt');
const client  = mqtt.connect('mqtt://localhost');

client.on('connect', () => {
    setInterval(() => {
      // publish data to broker every 2 seconds
      let randomTemp = Math.random() * (30 - 5) + 5;
      const data = {
        sensor: '5d80124787e67a0da8a71f47',
        value: randomTemp.toFixed(2)
      };
      let json = JSON.stringify(data);
      client.publish('temp', json);
    }, 12000);
  });
