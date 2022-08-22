import { serialize } from 'cookie';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method not allowed');
    return;
  }
  try {
    const options = { maxAge: 0, httpOnly: true, secure: false };
    res.setHeader('Set-Cookie', serialize('session', '', options));
    res.send(200);
  } catch (error) {
    console.log(error);
    res.status(400).send('Something went wrong');
  }
};

export default handler;
