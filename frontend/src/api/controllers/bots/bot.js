import axios from 'axios';
import connectAuth from '@/api/middleware/auth';
import connectDb from '@/api/middleware/mongodb';
import { Bot, BotUser, Message } from '@/api/models';

const getTokenInfo = async (token) => {
  try {
    const resp = await axios.get(`https://api.telegram.org/bot${token}/getMe`);
    return { ok: true, profile: resp.data.result };
  } catch (err) {
    return { ok: false, reason: 'Invalid token' };
  }
};

const botDetailHandler = async (req, res) => {
  try {
    const bot = await Bot.findById(req.query.id);
    res.status(200).send(bot.toObject({ minimize: false }));
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
};

const createBotHandler = async (req, res) => {
  try {
    const count = Bot.find({ owner: req.user.uid }).count();
    if (count >= 10) {
      res.status(400).send('Reached limit of bots');
      return;
    }
    const bot = await Bot.create({
      ...req.body,
      token: '',
      tokenInfo: { ok: false, reason: 'Missing token' },
      owner: req.user.uid,
      created: Date.now(),
    });
    res.status(201).send(bot);
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
};

const botProps = ['name', 'status', 'src', 'description'];

const updateBotHandler = async (req, res, next) => {
  try {
    const bot = await Bot.findOne({ _id: req.query.id, owner: req.user.uid });
    botProps.forEach((prop) => {
      if (typeof req.body[prop] !== 'undefined') {
        bot[prop] = req.body[prop];
      }
    });
    if (typeof req.body.token !== 'undefined') {
      const tokenInfo = await getTokenInfo(req.body.token);
      bot.token = req.body.token;
      bot.tokenInfo = tokenInfo;
    }

    await bot.save();
    res.status(200).send(bot);
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
};

export const deleteBotHandler = async (req, res) => {
  try {
    await Bot.deleteOne({ _id: req.query.id, owner: req.user.uid });
    await BotUser.deleteMany({ botId: req.query.id, botOwner: req.user.uid });
    await Message.deleteMany({ botId: req.query.id, botOwner: req.user.uid });
    res.status(204).send('Deleted');
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
};

const handler = async (req, res) => {
  if (req.method === 'GET') {
    return botDetailHandler(req, res);
  } if (req.method === 'POST') {
    return createBotHandler(req, res);
  } if (req.method === 'PUT') {
    return updateBotHandler(req, res);
  } if (req.method === 'DELETE') {
    return deleteBotHandler(req, res);
  }
  res.status(405).send('Method not allowed');
};

export default connectAuth(connectDb(handler));
