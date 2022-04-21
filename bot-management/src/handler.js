// import Sentry from '@sentry/node'
import { DateTime } from 'luxon'

import {
  convertFromSrcToExec,
  updateBotInRedis,
  setWebhook,
  unsetWebhook,
  deleteFromRedis,
} from './bots.js'
import { saveBotsSchedule } from './schedule.js'
import { Bot } from './models.js'

export const postHandler = async (req, res) => {
  const bot = await Bot.findById(req.params.botId).lean();
  if (!bot) {
    // Sentry.captureMessage("Not found")
    console.log("Bot not found")
    res.status(200).send()
    return
  }
  bot._id = String(bot._id)

  const botExec = convertFromSrcToExec(bot)
  try {
    await updateBotInRedis(bot, botExec)
    if (bot.status) {
      await setWebhook(bot)
    } else {
      await unsetWebhook(bot)
    }
    res.status(200).send()
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
}

export const deleteHandler = async (req, res) => {
  const bot = await Bot.findById(req.params.botId).lean();
  if (bot) {
    console.log('Bot still exists')
    // Sentry.captureMessage("Not found")
    res.status(200).send()
    return
  }
  try {
    await unsetWebhook(bot)
    await deleteFromRedis(req.params.botId)
    res.status(200).send()
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
}

export const scheduleHandler = async (req, res) => {
  res.status(200).send()
  const date = DateTime.utc().plus({ days: 1 })
  const start = date.startOf('day').toJSDate()
  const end = date.endOf('day').toJSDate()

  const query = {
    $or: [
      {scheduleEnd: {$lt: date}},
      {scheduleEnd: {$exists: false}},
    ]
  }
  let bots = await Bot.find(query).limit(10)
  while (bots.length) {
    console.log('Scheduling', bots.length, 'bots')
    try {
      await saveBotsSchedule(bots, start, end)
    } catch (err) {
      console.error(err)
      break
    }
    console.log('Saved')
    bots = await Bot.find(query).limit(10)
  }
  console.log('Finished')
}
