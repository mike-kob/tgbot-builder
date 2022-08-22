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
  const idToken = req.body.idToken.toString();
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const { uid } = decodedToken;
    const profile = {
      email: decodedToken.email,
      name: decodedToken.name,
      email_verified: decodedToken.email_verified,
      provider: decodedToken.firebase.sign_in_provider,
      picture: decodedToken.picture,
    };
    const user = await User.findOne({ uid });
    if (!user) {
      await User.create({
        uid,
        profile,
      });
    }

    const sessionCookie = await admin.auth().createSessionCookie(
      idToken,
      { expiresIn: COOKIE_EXPIRES_14_DAYS },
    );

    const options = { maxAge: COOKIE_EXPIRES_14_DAYS, httpOnly: true, secure: false };
    res.setHeader('Set-Cookie', serialize('session', String(sessionCookie), options));
    res.end(JSON.stringify({ status: 'success' }));
  } catch (error) {
    console.log(error);
    res.status(401).send('UNAUTHORIZED REQUEST!');
  }
};

export default connectDB(handler);
