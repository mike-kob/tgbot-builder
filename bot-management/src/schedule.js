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
    utc: true
  }

  return bot.src.flatMap(state => Object.entries(state.schedules).flatMap(([id, schedule]) => {
    const interval = parser.parseExpression(schedule.cron, options)
    return interval.iterate().map(d => ({
      date: d.getTime(),
      botId: bot._id,
      stateId: state.id,
      scheduleId: id,
    }))
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
  res.send(200)
  const date = DateTime.utc().plus({ days: 1 })
  const start = date.startOf('day').toJSDate()
  const end = date.endOf('day').toJSDate()

  let bots = await Bot.find({scheduleEnd: {$lt: date}}).limit(10)
  while (bots.length) {
    console.log('Scheduling', bots.length, 'bots')
    await saveBotsSchedule(bots, start, end)
    console.log('Saved')
    bots = await Bot.find({scheduleEnd: {$lt: date}}).limit(10)
  }
  console.log('Finished')
}
