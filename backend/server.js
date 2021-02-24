import express from 'express'
import Sentry from '@sentry/node'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import routes from './src/routes'
import { auth } from './src/utils/middleware'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000
const mongoDB = process.env.CONN_STR

// Logging
Sentry.init({
  dsn: process.env.SENTRY_DSN,
})

// Database
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))

console.log('Connected to Mongo')

// Server
app
  .use(Sentry.Handlers.requestHandler())
  .use(Sentry.Handlers.tracingHandler())
  .use((req, res, next) => {
    console.log(`${req.method} - ${req.path} - ${new Date()}`)
    next()
  })
  .use(cookieParser())
  .use(bodyParser.json())
  .use(auth)
  .use(routes)
  .use(Sentry.Handlers.errorHandler())

// Start server
app.listen(port, () => {
  console.log(`Server listening at port ${port}`)
})
