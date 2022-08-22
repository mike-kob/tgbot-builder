import mongoose from 'mongoose';

import connectAuth from '@/api/middleware/auth';
import connectDb from '@/api/middleware/mongodb';
import { Message } from '@/api/models';

const handler = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).send('Method not allowed');
    return;
  }
  if (!req.user) {
    res.send([]);
    return;
  }

  try {
    const msgs = await Message
      .find({ botOwner: req.user.uid, botId: mongoose.Types.ObjectId(req.query.id), chatId: req.query.userId })
      .sort({ ts: 'ascending' })
      .limit(500);
    res.status(200).send(msgs);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Something went wrong');
  }
};

export default connectAuth(connectDb(handler));
