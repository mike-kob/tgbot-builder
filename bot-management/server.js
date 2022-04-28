import Sentry from '@sentry/node'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import express from 'express'
import cron from 'node-cron'
import { register } from 'prom-client';

dotenv.config()

import { bot_mongo_change, bot_schedule, collect_db_metrics, collect_redis_metrics } from './src/metrics.js'
import { postHandler, deleteHandler, scheduleHandler } from './src/handler.js'
import { Bot } from './src/models.js'

// Logging
Sentry.init({ dsn: process.env.SENTRY_DSN })

// Database
mongoose.connect(process.env.CONN_STR, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))
console.log('Connected to Mongo')

Bot.watch(null, { fullDocument: 'updateLookup' }).on('change', (changeEvent) => {
  bot_mongo_change.inc({ operationType: changeEvent.operationType })
  switch(changeEvent.operationType) {
    case "delete":
      deleteHandler(changeEvent.fullDocument)
      break
    case "insert": case "update": case "replace":
      const fields = changeEvent.updateDescription?.updatedFields
      if (fields?.hasOwnProperty('src') || fields?.hasOwnProperty('token') || fields?.hasOwnProperty('status'))
        postHandler(changeEvent.fullDocument)
      break
  }
})
console.log('Set up watching change')

// Cron schedule
cron.schedule('0 22 * * *', () => {
  bot_schedule.inc()
  console.log("Scheduling started", new Date())
  scheduleHandler()
})
console.log('Set up scheduling')

// Reporting metrics
cron.schedule('*/5 * * * *', collect_db_metrics)
cron.schedule('*/5 * * * *', collect_redis_metrics)

express()
  .get('/metrics', async (_req, res) => {
    try {
      res.set('Content-Type', register.contentType);
      res.end(await register.metrics());
    } catch (err) {
      Sentry.captureException(err)
      res.status(500).end();
    }
  })
  .listen(4001, '0.0.0.0')
console.log('Set up serving metrics')
