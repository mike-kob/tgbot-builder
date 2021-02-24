import Sentry from '@sentry/node'
import firebase from './firebase'

export const auth = async (req, res, next) => {
  const cookie = req.cookies.session
  if (!cookie) {
    next()
    return
  }

  const admin = await firebase()

  try {
    const decoded = await admin.auth().verifySessionCookie(cookie, true)
    req.user = decoded
  } catch (e) {
    Sentry.captureException(e)
    res.status(401).send()
    return
  }
  next()
}
