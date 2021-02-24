import admin from 'firebase-admin'
import config from '../../credentials.json'

export default async () => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(config),
      databaseURL: process.env.FIREBASE_DB_URL,
    })
  }
  return admin
}
