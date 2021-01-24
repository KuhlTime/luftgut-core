import { firebase } from '../index'
import lowdb from '../../db'
import { Logger } from '../../lib/betterLog'
import setStationOwner from './setStationOwner'

const better = new Logger('⚙︎ Auth')

async function loginHandler(user: firebase.User): Promise<void> {
  // User logged in
  better.info('Logged in: ' + user.email)

  await setStationOwner()

  // Store user credentials
  lowdb
    .set('user', user)
    .set('idToken', await user.getIdToken())
    .write()
}

export default loginHandler
