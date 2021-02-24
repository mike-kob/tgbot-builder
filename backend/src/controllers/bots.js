import Sentry from '@sentry/node'
import axios from 'axios'

import Bot from '../models/Bot.js'
import { convertFromSrcToExec } from '../utils/bots'

export const botList = async (req, res, next) => {
  if (!req.user) {
    res.send([])
    return
  }
  try {
    const bots = await Bot.find({ owner: req.user.uid }).select(['_id', 'name', 'status'])
    res.status(200).send(bots)
  } catch (err) {
    console.log(err)
    return next(err)
  }
}

export const botDetail = async (req, res, next) => {
  try {
    const bot = await Bot.findById(req.params.id)
    res.status(200).send(bot.toObject({ minimize: false }))
  } catch (err) {
    console.log(err)
    return next(err)
  }
}

export const createBot = async (req, res, next) => {
  if (!req.user) {
    res.send(401)
    return
  }
  try {
    const bot = await Bot.create({
      ...req.body,
      owner: req.user.uid,
      created: Date.now(),
    })
    res.status(201).send(bot)
  } catch (err) {
    Sentry.captureException(err)
    console.log(err)
    return next(err)
  }
}

export const updateBot = async (req, res, next) => {
  if (!req.user) {
    res.send(401)
    return
  }

  try {
    const bot = await Bot.findOne({ _id: req.params.id, owner: req.user.uid })

    if (req.body.name) { bot.name = req.body.name }
    if (req.body.token) { bot.token = req.body.token }
    if (req.body.status) { bot.status = req.body.status }
    if (req.body.src) { bot.src = req.body.src }

    await bot.save()
    res.status(200).send(bot)
  } catch (err) {
    Sentry.captureException(err)
    console.log(err)
    return next(err)
  }
}

export const deleteBot = async (req, res, next) => {
  if (!req.user) {
    res.send(401)
    return
  }

  try {
    await Bot.deleteOne({ _id: req.params.id, owner: req.user.uid })
    res.status(204).send()
  } catch (err) {
    Sentry.captureException(err)
    console.log(err)
    return next(err)
  }
}

export const deployBot = async (req, res, next) => {
  const bot = await Bot.findById(req.params.id)
  const botExec = convertFromSrcToExec(bot)

  const resp = await axios.post(process.env.RUNTIME_HOST + '/api/bot', botExec)

  console.log(botExec)
  console.log(resp)
  res.send({ ok: true })
}
