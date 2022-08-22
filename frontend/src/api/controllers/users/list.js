import connectAuth from '@/api/middleware/auth';
import connectDb from '@/api/middleware/mongodb';
import { BotUser } from '@/api/models';

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
    const botUsers = await BotUser.find({ botOwner: req.user.uid, botId: req.query.id });
    res.status(200).send(botUsers);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Something went wrong');
  }
};

export default connectAuth(connectDb(handler));
