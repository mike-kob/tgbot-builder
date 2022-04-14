import Redis from 'ioredis'
import { Telegraf } from 'telegraf'
import { Validator } from 'jsonschema'
import fs from 'fs'

const redis = new Redis({ host: process.env.REDIS_HOST })

export const convertFromSrcToExec = (bot) => {
  const states = Object.values(bot.src).map(node => {
    const nodeInfo = node.data
    const state = {
      id: node.id,
      name: nodeInfo.label,
      default_triggers: nodeInfo.initial,
      cmd_triggers: {},
      msg_triggers: {},
    }
    for (const cmd of nodeInfo.commands) {
      const cmdName = '/' + cmd.name
      state.cmd_triggers[cmdName] = cmd.actions
    }
    for (const msg of nodeInfo.messages) {
      state.msg_triggers[msg.pattern] = msg.actions
    }
    return [state.id, state]
  })

  return {
    id: bot._id,
    token: bot.token,
    states: Object.fromEntries(states),
  }
}

export const saveToRedis = (botExec) => 
  redis.hset(botExec.id, '_info', JSON.stringify(botExec))

export const deleteFromRedis = (botId) => 
  redis.del(botId)

export const setWebhook = async (bot) => {
  const tgBot = new Telegraf(bot.token)
  const url = `${process.env.WEBHOOK_HOST}/update/${bot._id}`
  await tgBot.telegram.setWebhook(url, {
    certificate: { source: fs.readFileSync('server.cert') }
  })
}

export const unsetWebhook = async (bot) => {
  const tgBot = new Telegraf(bot.token)
  await tgBot.telegram.deleteWebhook()
}

const botActionSchema = {
  "id": "/BotAction",
  "type": "object",
  "properties": {
    "type": { "type": "string" },
    "options": { "type": "object" },
  },
  "required": ["type", "options"]
}


const botCommandSchema = {
  "id": "/BotStateCommand",
  "type": "object",
  "properties": {
    "name": { "type": "string", "pattern": "^\w$" },
    "actions": {
      "type": "array",
      "items": { "$ref": "/BotAction" }
    },
  },
  "required": ["name", "actions"]
}

const botMessageSchema = {
  "id": "/BotStateMessage",
  "type": "object",
  "properties": {
    "pattern": { "type": "string" },
    "actions": {
      "type": "array",
      "items": { "$ref": "/BotAction" }
    },
  },
  "required": ["pattern", "actions"]
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
        "messages": {
          "type": "array",
          "items": { "$ref": "/BotStateMessage" },
        },
        "initial": {
          "type": "array",
          "items": { "$ref": "/BotAction" },
        }
      },
      "required": ["label", "commands", "messages", "initial"]
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
    "src": {
      "type": "array",
      "items": { "$ref": "/BotState" }
    }
  },
  "required": ["_id", "token", "status", "src"]
}

const validator = new Validator()
validator.addSchema(botActionSchema)
validator.addSchema(botCommandSchema)
validator.addSchema(botMessageSchema)
validator.addSchema(botStateSchema)

export const validateBot = (bot) => 
  validator.validate(bot, botSchema)
