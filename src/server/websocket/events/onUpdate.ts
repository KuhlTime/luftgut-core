import { Logger } from '@/lib/betterLog'
import sendUpdate from '../sendUpdate'

const better = new Logger('Socket.io')

/**
 * Login Handler
 */
export default (): void => {
  better.info('Message: Force Update')
  sendUpdate()
}
