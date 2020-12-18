// This file stablishes the connection to the firebase database

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

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

// Setup firebase
firebase.initializeApp(firebaseConfig)

// Setup firestore
const db = firebase.firestore()

// Firebase authentication
const auth = firebase.auth()

const getCurrentUser = (): firebase.User => {
  return auth.currentUser
}
const isLoggedIn = (): boolean => {
  return getCurrentUser() !== null
}

// Setup firebase storage
const storage = firebase.storage()

// === Firebase Collections ===

const stations = db.collection('stations')
const capabilities = db.collection('capabilities')

// Export reusable modules
export { firebase, auth, getCurrentUser, isLoggedIn, storage, stations, capabilities }
