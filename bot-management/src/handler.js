// import Sentry from '@sentry/node'
import {
  validateBot,
  convertFromSrcToExec,
  saveToRedis,
  setWebhook,
  unsetWebhook,
  deleteFromRedis,
} from './bots.js'
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
    await saveToRedis(botExec)
    if (bot.status) {
      await setWebhook(bot)
    } else {
      await unsetWebhook(bot)
    }
    res.status(200).send()
  } catch (err) {
    console.log(err)
    res.status(500).send()
  }
}

export const deleteHandler = async (req, res) => {
  const bot = await Bot.findById(req.params.botId).lean();
  if (!bot) {
    // Sentry.captureMessage("Not found")
    res.status(200).send()
    return
  }
  try {
    await unsetWebhook(bot)
    await deleteFromRedis(req.params.botId)
    res.status(200).send()
  } catch (err) {
    console.log(err)
    res.status(500).send()
  }
}
