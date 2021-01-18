import { Logger } from '../../../lib/betterLog'
import { auth } from '../../../firebase'

const better = new Logger('⚡︎Socket')

/**
 * Logout Handler
 */
export default (): void => {
  better.info('Message: Logout')
  auth.signOut()
}
