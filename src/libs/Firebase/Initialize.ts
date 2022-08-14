import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

export const firebaseConfig = {
  apiKey: 'AIzaSyA9PZmKsXnJg0TPjN1rnYxWpsUzinPNamM',
  authDomain: 'forbidden-words-game.firebaseapp.com',
  projectId: 'forbidden-words-game',
  storageBucket: 'forbidden-words-game.appspot.com',
  messagingSenderId: '114468987612',
  appId: '1:114468987612:web:83260f94d52354b8ca8a19',
  measurementId: 'G-5K4J85EWFZ',
}

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAnalytics = getAnalytics(firebaseApp)
export const firebaseAuth = getAuth(firebaseApp)
export const firebaseDatabase = getDatabase(firebaseApp)
