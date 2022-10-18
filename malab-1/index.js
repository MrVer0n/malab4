const express = require('express');
const amqp = require('amqplib');

const qu = 'test';
const PORT = 2000;
const app = express();

app.get('/rainbowColor', (req, res) => {
  res.status(200).json(rainbow);
})
app.get('/rabbit', (req, res) => {
  res.send("Message send");
  sendMessage();
})

app.listen(PORT, () => console.log('Server work(PORT:' + PORT + ')'));

async function sendMessage() {
  const conn = await amqp.connect('amqp://user:124@rabbitmq:5672');
  const ch = await conn.createChannel();

  await ch.assertQueue(qu);
  ch.sendToQueue(qu, Buffer.from('Test message'));
  await ch.close();
  await conn.close();
}

const rainbow = [
    {
    "number": 1,
    "color": "красный",
    "word": "каждый"
    },
    {
      "number": 2,
      "color": "оранжевый",
      "word": "охотник"
    },
    {
      "number": 3,
      "color": "желтый",
      "word": "желает"
    },
    {
      "number": 4,
      "color": "зеленый",
      "word": "знать"
    },
    {
      "number": 5,
      "color": "голубой",
      "word": "где"
    },
    {
      "number": 6,
      "color": "синий",
      "word": "сидит"
    },
    {
      "number": 7,
      "color": "фиолетовый",
      "word": "фазан"
    }
  ]