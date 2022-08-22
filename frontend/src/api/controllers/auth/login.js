import { serialize } from 'cookie';

import connectDB from '@/api/middleware/mongodb';
import { User } from '@/api/models';
import firebase from '@/api/utils/firebase-admin';

const COOKIE_EXPIRES_14_DAYS = 60 * 60 * 24 * 1000 * 14;

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method not allowed');
    return;
  }
  const admin = await firebase();
  try {
    const idToken = req.body.idToken.toString();
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const { uid } = decodedToken;
    const user = await User.findOne({ uid });
    if (!user) {
      res.status(400).send('User is not registered');
      return;
    }

    const sessionCookie = await admin.auth().createSessionCookie(
      idToken,
      { expiresIn: COOKIE_EXPIRES_14_DAYS },
    );

    const options = { maxAge: COOKIE_EXPIRES_14_DAYS };
    res.setHeader('Set-Cookie', serialize('session', String(sessionCookie), options));
    res.end(JSON.stringify({ status: 'success' }));
  } catch (error) {
    console.log(error);
    res.status(401).send('UNAUTHORIZED REQUEST!');
  }
};

export default connectDB(handler);
