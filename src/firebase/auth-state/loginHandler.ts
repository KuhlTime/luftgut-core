import { firebase } from '../index'
import lowdb from '../../db'
import { Logger } from '../../lib/betterLog'
import initializeStation from './initializeStation'

const better = new Logger('⚙︎ Auth')

async function loginHandler(user: firebase.User): Promise<void> {
  // User logged in
  better.info('User Logged in: ' + user.email)

  await initializeStation()

  // Store user credentials
  lowdb
    .set('user', user)
    .set('idToken', await user.getIdToken())
    .write()
}

export default loginHandler
