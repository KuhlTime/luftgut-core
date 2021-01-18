import { auth } from '../index'

import loginHandler from './loginHandler'
import logoutHandler from './logoutHandler'
import restoreHandler from './restoreHandler'

import sendUpdate from '../../server/websocket/sendUpdate'

/**
 * The startup variable is necessary for the initial auth state change
 * to trigger the reauthentication if there is a stored user credential
 */
let startup = true

auth.onAuthStateChanged(async user => {
  // On launch the user will always ne logged out
  if (startup) {
    startup = false
    restoreHandler()
  } else {
    if (user) loginHandler(user)
    else logoutHandler()
  }

  // Broadcast Application change to clients
  sendUpdate()
})
