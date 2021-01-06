import * as Message from '@/models/messages'
import { Logger } from '@/lib/betterLog'
import { auth } from '@/firebase'

const better = new Logger('Socket.io')

/**
 * Login Handler
 */
export default (data: Message.Setup): void => {
  better.info('Message: Setup')
  auth.signInWithEmailAndPassword(data.email, data.password)
}
