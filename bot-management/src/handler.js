import {
  validateBot,
  convertFromSrcToExec,
  saveToRedis,
  setWebhook,
  unsetWebhook,
} from './bots.js'

export default async (req, res, next) => {
  const bot = req.body;
  const validationRes = validateBot(bot)
  if (!validationRes.valid) {
    res.status(400).send(validationRes.errors)
    return
  }

  const botExec = convertFromSrcToExec(bot)
  await saveToRedis(botExec)
  if (bot.status) {
    await setWebhook(bot)
  } else {
    await unsetWebhook(bot)
  }
  res.status(200).send()
}
