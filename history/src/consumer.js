import mongoose from 'mongoose'
import Sentry from '@sentry/node'

import {
  manageUpdate,
  manageBotMessage,
  manageChangeState,
  manageMakeRequest,
  manageSaveUserData,
} from './messages.js'

const parseKey = (routingKey) => {
  const res = {}
  const parts = routingKey.split('.')
  if (parts[0] != 'bot') {
    throw Error('Cannot parse routing key')
  }
  res.botId = mongoose.Types.ObjectId(parts[1])
  res.type = parts[2]
  if (res.type === 'action') {
    res.action = parts[3]
  }
  return res
}

export default channel => async msg => {
  try {
    console.log(new Date(), 'RCV msg with key', msg.fields.routingKey)
    const parsedMsg = JSON.parse(msg?.content.toString())
    const parsedKey = parseKey(msg.fields.routingKey)

    if (parsedKey.type === 'update') {
      await manageUpdate(parsedKey.botId, parsedMsg)
    } else {
      switch (parsedKey.action) {
        case 'send_message':
          await manageBotMessage(parsedKey.botId, parsedMsg)
          break
        case 'change_state':
          await manageChangeState(parsedKey.botId, parsedMsg)
          break
        case 'make_request':
          await manageMakeRequest(parsedKey.botId, parsedMsg)
          break
        case 'save_user_data':
          await manageSaveUserData(parsedKey.botId, parsedMsg)
          break
      }
    }
    channel.ack(msg)
    console.log('ACKED')
  } catch (err) {
    channel.nack(msg)
    console.error(err)
    Sentry.captureException(err)
  }
}
