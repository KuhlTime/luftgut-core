import lowdb from '../../db'
import { Logger } from '../../lib/betterLog'

const better = new Logger('⚙︎ Auth')

function logoutHandler(): void {
  // Delete entry in db
  better.info('User is Logged Out')
  lowdb.set('user', undefined).set('idToken', undefined).write()
}

export default logoutHandler
