import Sentry from '@sentry/node'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import amqp from 'amqplib/callback_api.js'

import consumer from './src/consumer.js'

dotenv.config()

// Logging
Sentry.init({
  dsn: process.env.SENTRY_DSN,
})

// Database
mongoose.connect(process.env.CONN_STR, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))

console.log('Connected to Mongo')

// RabbitMQ
const QUEUE_NAME = 'history_queue';

amqp.connect(`amqp://guest:guest@${process.env.RABBITMQ_HOST}`, (err, connection) => {
  if (err) {
    Sentry.captureException(err)
    throw err;
  }
  connection.createChannel((err, channel) => {
    if (err) {
      Sentry.captureException(err)
      throw err;
    }
    console.log('Connected to RabbitMQ')

    channel.assertQueue(QUEUE_NAME, {
      durable: true
    });
    channel.bindQueue(QUEUE_NAME, 'updates', 'bot.*.*.#')

    channel.consume(QUEUE_NAME, consumer(channel))
  });
});
