// The file has to be JS, because there is a typescript bug with the firebase.User class
// https://github.com/firebase/firebase-js-sdk/issues/1874#issuecomment-549085119
import { firebase, auth } from '../index'
import lowdb from '../../db'
import { Logger } from '../../lib/betterLog'

const better = new Logger('⚙︎ Auth')

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function restoreHandler() {
  // Check if there is a user entry inside the lowdb
  if (lowdb.has('user').value()) {
    better.info('Restoring User Credentials')

    const userData = lowdb.get('user').value()

    const fbUser = new firebase.User(userData, userData.stsTokenManager, userData)

    // TODO: Check if the token expired

    try {
      await auth.updateCurrentUser(fbUser)
    } catch (err) {
      better.error(err.message)
      return
    }
  } else {
    better.info('No User Found')
  }
}

export default restoreHandler
