import { Message, BotUser, Bot } from "./models.js"

const ensureBotUser = async (bot, chat) => {
  const user = await BotUser.findOne({ botId: bot._id, id: chat.id })
  if (!user) {
    await BotUser.create({
      botId: bot._id,
      botOwner: bot.owner,
      id: chat.id,
      firstName: chat.first_name,
      lastName: chat.last_name,
      username: chat.username,
    })
  }
}

export const manageUpdate = async (botId, update) => {
  const bot = await Bot.findById(botId)
  await ensureBotUser(bot, update.message.chat)
  const msg = Message({
    botId: bot._id,
    botOwner: bot.owner,
    chatId: update.message.chat.id,
    isBot: false,
    type: "message",
    ts: update.date,
    msg: update.message,
  })
  await msg.save()
}

export const manageBotMessage = async (botId, message) => {
  const bot = await Bot.findById(botId)
  await ensureBotUser(bot, message.chat)
  await Message.create({
    botId: bot._id,
    botOwner: bot.owner,
    chatId: message.chat.id,
    isBot: true,
    type: "message",
    ts: message.date,
    msg: message,
  })
}

export const manageMakeRequest = async (botId, info) => {
  const bot = await Bot.findById(botId)
  await ensureBotUser(bot, info.chat)
  await Message.create({
    botId: bot._id,
    botOwner: bot.owner,
    chatId: info.chat.id,
    isBot: true,
    type: "request",
    ts: info.date,
    msg: info,
  })
}

export const manageChangeState = async (botId, info) => {
  const bot = await Bot.findById(botId)
  await ensureBotUser(bot, info.chat)
  await Message.create({
    botId: bot._id,
    botOwner: bot.owner,
    chatId: info.chat.id,
    isBot: false,
    type: "change_state",
    ts: info.date,
    msg: info,
  })
}
