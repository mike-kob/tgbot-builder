import parser from 'cron-parser'
import Redis from 'ioredis'

const redis = new Redis({ host: process.env.REDIS_HOST })
const SCHEDULE_QUEUE = 'bot_schedule'

const createBotSchedule = (bot, botVersion, start, end) => {
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
        botVersion: botVersion,
        stateId: state.id,
        scheduleId: schedule.id,
      })
    }
    return res
  }))
}

export const saveBotSchedule = async (bot, start, end) => {
  const botVersion = await redis.hget(String(bot._id), "_version")
  const scheduleEntries = createBotSchedule(bot, botVersion, start, end)
    .flatMap(s => [s.date, JSON.stringify(s)])
  
  if (scheduleEntries.length) {
    await redis.zadd(SCHEDULE_QUEUE, ...scheduleEntries)
  }
}

export const saveBotsSchedule = (bots, start, end) => 
  bots.forEach(async bot => {
    await saveBotSchedule(bot, start, end)
    bot.scheduleEnd = end
    await bot.save()
  })
