import Sentry from '@sentry/node'
import client from 'prom-client'
import Redis from 'ioredis'
import mongoose from 'mongoose'

export const bot_mongo_change = new client.Counter({
  name: 'bot_mongo_change',
  help: 'ChangeEvent from Mongo stream',
  labelNames: ['operationType'],
});

export const bot_schedule = new client.Counter({
  name: 'bot_schedule',
  help: 'Schedule job invocations',
});

export const bot_count = new client.Gauge({
  name: 'bot_count',
  help: 'Number of bots in database',
  labelNames: ['active'],
});

export const user_count = new client.Gauge({
  name: 'user_count',
  help: 'Number of users in database',
});

export const bot_user_count = new client.Gauge({
  name: 'bot_user_count',
  help: 'Number of bot users in database',
});

export const message_count = new client.Gauge({
  name: 'message_count',
  help: 'Number of messages in database',
});

export const redis_key_count = new client.Gauge({
  name: 'redis_key_count',
  help: 'Number of keys in redis',
});

export const redis_task_queue_size = new client.Gauge({
  name: 'redis_task_queue_size',
  help: 'Number of tasks in redis queue',
});

export const collect_redis_metrics = async () => {
  const redis = new Redis({ host: process.env.REDIS_HOST })
  const dbsize = await redis.dbsize()
  const queueSize = await redis.zcount('bot_schedule', '-inf', '+inf')
  
  redis_key_count.set(dbsize)
  redis_task_queue_size.set(queueSize)
}

export const collect_db_metrics = async () => {
  try {
    const conn = mongoose.connection

    const userCount = await conn.db.collection('users').estimatedDocumentCount()
    const botCount = await conn.db.collection('bots').estimatedDocumentCount()
    const botActiveCount = await conn.db.collection('bots').find({status: true}).count()
    const botUserCount = await conn.db.collection('botusers').estimatedDocumentCount()
    const messageCount = await conn.db.collection('messages').estimatedDocumentCount()

    bot_count.set({active: 'true'}, botActiveCount)
    bot_count.set({active: 'false'}, botCount - botActiveCount)
    bot_count.set({active: 'all'}, botCount)
    user_count.set(userCount)
    bot_user_count.set(botUserCount)
    message_count.set(messageCount)
  } catch(err) {
    console.error(err)
    Sentry.captureException(err)
  }
}
