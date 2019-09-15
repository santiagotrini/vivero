// testeando mqtt en express
// sacado de https://www.npmjs.com/package/mqtt
// para testear y publicar al broker desde bash
// $ mqtt pub -t 'temp' -h 'localhost' -m 'hola soy un mensaje'

const mqtt = require('mqtt');
const client  = mqtt.connect('mqtt://localhost');

client.on('connect', () => {
  // subscribe topics on connection
  console.log('Connected to MQTT broker');
  client.subscribe('temp', err => {
    if (!err) {
      console.log('Subscribing on temp');
    }
  });
});

client.on('message', (topic, message) => {
  console.log(topic.toString() + ': ' + message.toString())
  // si recibo un mensaje puedo hacer lo que quiera aca, como un insert
});
