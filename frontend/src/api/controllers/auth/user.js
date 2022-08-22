import connectAuth from '@/api/middleware/auth';

const handler = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).send('Method not allowed');
    return;
  }
  if (req.user) {
    res.json({
      uid: req.user.uid,
      picture: req.user.picture,
      name: req.user.name,
      email: req.user.email,
    });
  } else {
    res.json({});
  }
};

export default connectAuth(handler);
