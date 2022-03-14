import Redis from 'ioredis'
import { Telegraf } from 'telegraf'
import { Validator } from 'jsonschema'

const redis = new Redis({ host: process.env.REDIS_HOST })

export const convertFromSrcToExec = (bot) => {
  const states = bot.src.concat([bot.initState]).map(node => {
    const nodeInfo = node.data
    const state = {
      id: node.id,
      name: nodeInfo.label,
      default_triggers: [],
      cmd_triggers: {},
      msg_triggers: {},
    }
    for (const cmd of nodeInfo.commands) {
      state.cmd_triggers[cmd.name] = cmd.actions
    }
    return [state.id, state]
  })

  return {
    id: bot._id,
    token: bot.token,
    states: Object.fromEntries(states),
  }
}

export const saveToRedis = async (botExec) => 
  redis.hset(botExec.id, '_info', JSON.stringify(botExec))

export const setWebhook = async (bot) => {
  const tgBot = new Telegraf(bot.token)
  const url = `${process.env.WEBHOOK_HOST}/update/${bot._id}`
  await tgBot.telegram.setWebhook(url)
}

export const unsetWebhook = async (bot) => {
  const tgBot = new Telegraf(bot.token)
  await tgBot.telegram.deleteWebhook()
}

const botCommandSchema = {
  "id": "/BotStateCommand",
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "actions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "type": { "type": "string" },
          "options": { "type": "object" },
        }
      }
    },
  },
  "required": ["name", "actions"]
}

const botStateSchema = {
  "id": "/BotState",
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "type": { "type": "string" },
    "position": { "type": "object" },
    "data": {
      "type": "object",
      "properties": {
        "label": { "type": "string" },
        "commands": {
          "type": "array",
          "items": { "$ref": "/BotStateCommand" },
        },
      },
      "required": ["label", "commands"]
    }
  },
  "required": ["data"]
}

const botSchema = {
  "id": "/Bot",
  "type": "object",
  "properties": {
    "_id": {
      "type": "string",
      "pattern": "^[0-9A-Za-z\-_]+$"
    },
    "owner": { "type": "string" },
    "name": { "type": "string" },
    "token": { "type": "string" },
    "status": { "type": "boolean" },
    "initState": { "$ref": "/BotState" },
    "src": {
      "type": "array",
      "items": { "$ref": "/BotState" }
    }
  },
  "required": ["_id", "token", "status", "initState", "src"]
}

const validator = new Validator()
validator.addSchema(botCommandSchema)
validator.addSchema(botStateSchema)

export const validateBot = (bot) => 
  validator.validate(bot, botSchema)
