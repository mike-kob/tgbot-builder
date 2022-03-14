import express from 'express'
import Sentry from '@sentry/node'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

dotenv.config()

import handler from './src/handler.js'
import auth from './src/auth.js'

const app = express()
const port = process.env.PORT || 5000

// Logging
// Sentry.init({
//   dsn: process.env.SENTRY_DSN,
// })

// Server
app
  // .use(Sentry.Handlers.requestHandler())
  // .use(Sentry.Handlers.tracingHandler())
  .use((req, res, next) => {
    console.log(`${req.method} - ${req.path} - ${new Date()}`)
    next()
  })
  .use(bodyParser.json())
  .post('/', auth, handler)
  // .use(Sentry.Handlers.errorHandler())

// Start server
app.listen(port, () => {
  console.log(`Server listening at port ${port}`)
})
