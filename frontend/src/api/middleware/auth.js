import firebase from '@/api/utils/firebase-admin';

export default (handler) => async (req, res) => {
  const cookie = req.cookies.session;
  if (!cookie) {
    return handler(req, res);
  }

  const admin = await firebase();

  try {
    const decoded = await admin.auth().verifySessionCookie(cookie, true);
    req.user = decoded;
  } catch (e) {
    res.status(401).send('Unauthorized');
    return;
  }
  if (!req.user) {
    res.status(401).send('Unauthorized');
    return;
  }
  return handler(req, res);
};
