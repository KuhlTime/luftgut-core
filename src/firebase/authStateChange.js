// Has to be a javascript file because otherwise the firebase.User instance
// creation failes
// https://github.com/firebase/firebase-js-sdk/issues/1874#issuecomment-549085119

import { firebase, auth, stations } from './index'
import lowdb from '../db'
import { Logger } from '../lib/betterLog'

const better = new Logger('Auth')

let startup = true

auth.onAuthStateChanged(async user => {
  // On launch the user will always ne logged out
  if (startup) {
    startup = false

    // Check if there is a user entry inside the lowdb
    if (lowdb.has('user').value()) {
      better.info('Restoring User Credentials')

      const userData = lowdb.get('user').value()

      const fbUser = new firebase.User(userData, userData.stsTokenManager, userData)

      // TODO: Check if the token expired

      // TODO: Handle Login Error
      try {
        await auth.updateCurrentUser(fbUser)
      } catch (err) {
        better.error(err.message)
        return
      }
    } else {
      // console.log('No stored user found')
      better.info('No User Found')
    }
  } else {
    if (user) {
      // User logged in
      better.info('User Logged In')

      // Store user credentials
      lowdb
        .set('user', user)
        .set('idToken', await user.getIdToken())
        .write()

      // Test if login was successfull by reading some data
      stations.get().then(snap => {
        better.info(`Found ${snap.size} Stations`)
      })
    } else {
      // User legit logged out
      // Delete entry in db
      better.info('User is Logged Out')
      lowdb.set('user', undefined).set('idToken', undefined).write()
    }
  }
})
