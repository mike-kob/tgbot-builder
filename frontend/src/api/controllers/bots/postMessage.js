import axios from 'axios';
import mongoose from 'mongoose';
import connectAuth from '@/api/middleware/auth';
import connectDb from '@/api/middleware/mongodb';
import { Bot, Message } from '@/api/models';

const postMessageHandler = async (req, res) => {
  try {
    const { chatId, text } = req.body;
    const bot = await Bot.findOne({ _id: req.query.id, owner: req.user.uid });
    const response = await axios.post(`https://api.telegram.org/bot${bot.token}/sendMessage`, {
      chat_id: chatId, text,
    });

    if (response.status === 200) {
      const msg = await Message.create({
        botId: mongoose.Types.ObjectId(req.query.id),
        botOwner: req.user.uid,
        chatId,
        isBot: true,
        type: 'admin_message',
        ts: response.data.result.date,
        msg: response.data.result,
      });
      res.status(201).send(msg);
    } else {
      console.error(response.data);
      res.status(400).send();
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
};

const handler = async (req, res) => {
  if (req.method === 'POST') {
    return postMessageHandler(req, res);
  }
  res.status(405).send('Method not allowed');
};

export default connectAuth(connectDb(handler));
