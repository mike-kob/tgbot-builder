import parser from 'cron-parser'
import Redis from 'ioredis'
import { DateTime } from 'luxon'

import { Bot } from './models.js'

const redis = new Redis({ host: process.env.REDIS_HOST })
const SCHEDULE_QUEUE = 'bot_schedule'

const createBotSchedule = (bot, start, end) => {
  const options = {
    currentDate: start,
    endDate: end,
    utc: true,
    iterator: true,
  }

  return Object.values(bot.src).flatMap(state => state.data.schedule.flatMap((schedule) => {
    const interval = parser.parseExpression(schedule.cron, options)
    const res = []
    while (interval.hasNext()) {
      const obj = interval.next()
      res.push({
        date: obj.value.getTime(),
        botId: bot._id,
        stateId: state.id,
        scheduleId: schedule.id,
      })
    }
    return res
  }))
}

const saveBotsSchedule = (bots, start, end) => 
  bots.forEach(async bot => {
    const scheduleEntries = createBotSchedule(bot, start, end)
      .flatMap(s => [s.date, JSON.stringify(s)])
    
    if (scheduleEntries.length) {
      await redis.zadd(SCHEDULE_QUEUE, ...scheduleEntries)
    }
    bot.scheduleEnd = end
    await bot.save()
  })

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
