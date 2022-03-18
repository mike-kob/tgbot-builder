// import Sentry from '@sentry/node'
import {
  validateBot,
  convertFromSrcToExec,
  saveToRedis,
  setWebhook,
  unsetWebhook,
} from './bots.js'
import { Bot } from './models.js'

export default async (req, res, next) => {
  const bot = await Bot.findById(req.params.botId).lean();
  if (!bot) {
    // Sentry.captureMessage("Not found")
    res.status(200).send()
    return
  }
  bot._id = String(bot._id)
  const validationRes = validateBot(bot)
  if (!validationRes.valid) {
    res.status(400).send(validationRes.errors)
    return
  }

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
