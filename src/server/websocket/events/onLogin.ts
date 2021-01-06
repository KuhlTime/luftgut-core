import { LoginMessage } from '@/models/messages'
import { Logger } from '@/lib/betterLog'
import { auth } from '@/firebase'

const better = new Logger('Socket.io')

/**
 * Login Handler
 */
export default (message: LoginMessage): void => {
  better.info('Message: Login')
  auth.signInWithEmailAndPassword(message.email, message.password)
}
