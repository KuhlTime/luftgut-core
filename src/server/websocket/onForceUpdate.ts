import { Logger } from '../../lib/betterLog'
import sendUpdate from './sendUpdate'

const better = new Logger('⚡︎Logger')

/**
 * Login Handler
 */
export default (): void => {
  better.info('Message: Force Client Update')
  sendUpdate()
}
