import Message from './Message'
import { firebase } from '@/firebase'

/**
 * This messages holds any information needed by the client.
 * Sending all information at once ensures more flexablility
 * as well as less code to write on the client side.
 * @to Client
 * @warning Be carefull many of the objects may be undefined.
 * @warning Do not include any computation.
 */
export default class UpdateMessage extends Message {
  isAuthenticated: boolean
  user?: firebase.User

  constructor(isAuthenticated: boolean, user?: firebase.User) {
    super()
    this.isAuthenticated = isAuthenticated
    this.user = user
  }
}
