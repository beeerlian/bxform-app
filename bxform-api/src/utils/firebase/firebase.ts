import config from 'configs/config'
import admin from 'firebase-admin'

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(config.firebase.keyPath)
})

export const firebase = firebaseApp
