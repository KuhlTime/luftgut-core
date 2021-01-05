import { firebase } from '@/firebase'

/**
 * This messages holds any information needed by the client.
 * Sending all information at once ensures more flexablility
 * as well as less code to write on the client side.
 * @warning Be carefull many of the objects may be undefined.
 * @warning Do not include any computation.
 */
export default class Update {
  user?: firebase.User

  constructor(user?: firebase.User) {
    this.user = user
  }
}
