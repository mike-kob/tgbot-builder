import {
  validateBot,
  convertFromSrcToExec,
  saveToRedis,
  setWebhook,
  unsetWebhook,
} from './bots.js'

export default async (req, res, next) => {
  const bot = req.body;
  bot._id = bot._id['$oid']
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
