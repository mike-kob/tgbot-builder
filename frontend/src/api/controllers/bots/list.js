import connectAuth from '@/api/middleware/auth';
import connectDb from '@/api/middleware/mongodb';
import { Bot } from '@/api/models';

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
    const bots = await Bot.find({ owner: req.user.uid }).select(['_id', 'name', 'status', 'description']);
    res.status(200).send(bots);
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
};

export default connectAuth(connectDb(handler));
