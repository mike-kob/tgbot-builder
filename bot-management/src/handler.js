import Sentry from '@sentry/node'
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

export const postHandler = async (bot) => {
  if (!bot)
    return
  bot._id = String(bot._id)

  const botExec = convertFromSrcToExec(bot)
  try {
    await updateBotInRedis(bot, botExec)
    if (bot.status && bot.token) {
      await setWebhook(bot)
    } else if (bot.token) {
      await unsetWebhook(bot)
    }
  } catch (err) {
    Sentry.captureException(err)
    console.error(err)
  }
}

export const deleteHandler = async (bot) => {
  if (!bot)
    return
  try {
    if (bot.token) {
      await unsetWebhook(bot)
    }
    await deleteFromRedis(req.params.botId)
  } catch (err) {
    Sentry.captureException(err)
    console.error(err)
  }
}

export const scheduleHandler = async () => {
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
      Sentry.captureException(err)
      console.error(err)
      break
    }
    console.log('Saved')
    bots = await Bot.find(query).limit(10)
  }
  console.log('Finished')
}
