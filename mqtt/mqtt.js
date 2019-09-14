// testeando mqtt en express
// sacado de https://www.npmjs.com/package/mqtt
// para testear y publicar al broker desde bash
// $ mqtt pub -t 'temp' -h 'localhost' -m 'hola soy un mensaje'

const mqtt = require('mqtt');
const client  = mqtt.connect('mqtt://localhost');

client.on('connect', () => {
  client.subscribe('hola', err => {
    if (!err) {
      client.publish('temp', '24.5');
    }
  });
});

client.on('message', (topic, message) => {
  // message is Buffer
  console.log(topic.toString() + ': ' + message.toString())
  // si recibo un mensaje puedo hacer lo que quiera aca, como un insert
  // client.end()
});
