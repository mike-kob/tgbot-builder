import connectAuth from '@/api/middleware/auth'
import connectDb from '@/api/middleware/mongodb'
import { Bot } from '@/api/models'

const botDetailHandler = async (req, res) => {
  try {
    const bot = await Bot.findById(req.query.id)
    res.status(200).send(bot.toObject({ minimize: false }))
  } catch (err) {
    console.log(err)
    res.status(500).send('Something went wrong')
  }
}

const createBotHadler = async (req, res) => {
  try {
    const bot = await Bot.create({
      ...req.body,
      owner: req.user.uid,
      created: Date.now(),
    })
    res.status(201).send(bot)
  } catch (err) {
    console.log(err)
    res.status(500).send('Something went wrong')
  }
}

const botProps = ['name', 'token', 'status', 'src']

const updateBotHandler = async (req, res, next) => {
  try {
    const bot = await Bot.findOne({ _id: req.query.id, owner: req.user.uid })
    botProps.forEach(prop => {
      if (typeof req.body[prop] !== 'undefined') {
        bot[prop] = req.body[prop]
      }
    })

    await bot.save()
    res.status(200).send(bot)
  } catch (err) {
    console.log(err)
    res.status(500).send('Something went wrong')
  }
}

export const deleteBotHandler = async (req, res) => {
  try {
    await Bot.deleteOne({ _id: req.query.id, owner: req.user.uid })
    res.status(204).send('Deleted')
  } catch (err) {
    console.log(err)
    res.status(500).send('Something went wrong')
  }
}

const handler = async (req, res) => {
  if (req.method === 'GET') {
    return botDetailHandler(req, res)
  } else if (req.method === 'POST') {
    return createBotHadler(req, res)
  } else if (req.method === 'PUT') {
    return updateBotHandler(req, res)
  } else if (req.method === 'DELETE') {
    return deleteBotHandler(req, res)
  } else {
    res.status(405).send('Method not allowed')
  }
}

export default connectAuth(connectDb(handler))
