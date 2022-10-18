const express = require('express');
const amqp = require('amqplib');

const qu = 'test';
const PORT = 2001;
const app = express();

app.get('/seasonsColor', (req, res) => {
  res.status(200).json(seasons);
})

// app.get('/rabbit', (req, res) => {
//   messageHandler();
//   res.send("Message processed")
// })
messageHandler();

app.listen(PORT, () => console.log('Server work(PORT:' + PORT + ')'));

async function messageHandler() {
  const conn = await amqp.connect('amqp://user:124@rabbitmq:5672');
  const ch = await conn.createChannel();

  ch.consume(qu, (msg) => {
    const mess = msg.content.toString();
    console.log(mess);
    ch.ack(msg);
    // setTimeout(() => {  
    //   ch.close();
    //   conn.close(); 
    // }, 2000);
  })
}


const seasons = [
    {
    "number": 1,
    "color": "жёлтый",
    "word": "лето"
    },
    {
      "number": 2,
      "color": "оранжевый",
      "word": "осень"
    },
    {
      "number": 3,
      "color": "белый",
      "word": "зима"
    },
    {
      "number": 4,
      "color": "зеленый",
      "word": "весна"
    },
  ]