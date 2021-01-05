// This file stablishes the connection to the firebase database

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// === FIREBASE ===

// Firebase credentials
const firebaseConfig = {
  apiKey: 'AIzaSyBL4mnfw7mMNA85k9ylXrzXjRjaLZcWp9Y',
  authDomain: 'wetter-station-hsd.firebaseapp.com',
  databaseURL: 'https://wetter-station-hsd.firebaseio.com',
  projectId: 'wetter-station-hsd',
  storageBucket: 'wetter-station-hsd.appspot.com',
  messagingSenderId: '1079300047838',
  appId: '1:1079300047838:web:f8582a5371bd2c642ed34f',
  measurementId: 'G-PQNRM1E3XV'
}

firebase.initializeApp(firebaseConfig)

export { firebase }

// === FIRESTORE ===

export const db = firebase.firestore()

export const stations = db.collection('stations')
export const capabilities = db.collection('capabilities')

// === AUTH ===

export const auth = firebase.auth()

export const getCurrentUser = (): firebase.User => {
  return auth.currentUser
}

export const isLoggedIn = (): boolean => {
  return getCurrentUser() !== null
}

// === STORAGE ===

export const storage = firebase.storage()
