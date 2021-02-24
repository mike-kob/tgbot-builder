import Sentry from '@sentry/node'
import firebase from '../utils/firebase'

import User from '../models/User.js'

const COOKIE_EXPIRES_14_DAYS = 60 * 60 * 24 * 1000 * 14

export const user = async (req, res, next) => {
  if (req.user) {
    res.json({
      uid: req.user.uid,
      picture: req.user.picture,
      name: req.user.name,
      email: req.user.email,
    })
  } else {
    res.json({})
  }
}

export const logout = async (req, res, next) => {
  const options = { maxAge: 0, httpOnly: true, secure: false }
  res.cookie('session', '', options)
  res.send(200)
}

export const login = async (req, res, next) => {
  const admin = await firebase()
  try {
    const idToken = req.body.idToken.toString()
    const decodedToken = await admin.auth().verifyIdToken(idToken)

    const uid = decodedToken.uid
    const user = await User.findOne({ uid: uid })
    if (!user) {
      res.status(400).send('User is not registered')
      return
    }

    const sessionCookie = await admin.auth().createSessionCookie(
      idToken,
      { expiresIn: COOKIE_EXPIRES_14_DAYS },
    )

    const options = { maxAge: COOKIE_EXPIRES_14_DAYS }
    res.cookie('session', sessionCookie, options)
    res.end(JSON.stringify({ status: 'success' }))
  } catch (error) {
    Sentry.captureException(error)
    console.log(error)
    res.status(401).send('UNAUTHORIZED REQUEST!')
  }
}

export const signup = async (req, res, next) => {
  const admin = await firebase()
  const idToken = req.body.idToken.toString()
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken)

    const uid = decodedToken.uid
    const profile = {
      email: decodedToken.email,
      name: decodedToken.name,
      email_verified: decodedToken.email_verified,
      provider: decodedToken.firebase.sign_in_provider,
      picture: decodedToken.picture,
    }
    const user = await User.findOne({ uid: uid })
    if (!user) {
      await User.create({
        uid: uid,
        profile: profile,
      })
    }

    const sessionCookie = await admin.auth().createSessionCookie(
      idToken,
      { expiresIn: COOKIE_EXPIRES_14_DAYS },
    )

    const options = { maxAge: COOKIE_EXPIRES_14_DAYS, httpOnly: true, secure: false }
    res.cookie('session', sessionCookie, options)
    res.end(JSON.stringify({ status: 'success' }))
  } catch (error) {
    Sentry.captureException(error)
    console.log(error)
    res.status(401).send('UNAUTHORIZED REQUEST!')
  }
}
