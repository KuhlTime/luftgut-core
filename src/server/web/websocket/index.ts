import { io } from 'socket.io-client'
import { ErrorMessage, UpdateMessage } from '../../../models/messages'
import store from '../store'
import router from '../router'

const socket = io()

socket.on('update', msg => {
  const updateMessage = UpdateMessage.toClass(msg)

  store.commit('setUpdateMessage', updateMessage)
  store.commit('setIdle')

  const routeName = router.currentRoute.name

  // Update Route
  // forward the user to another route if necessary
  if (updateMessage.isAuthenticated) {
    if (routeName === 'Login') {
      router.push({ name: 'Dashboard' })
    }
  } else {
    if (routeName !== 'Login') {
      router.push({ name: 'Login' })
    }
  }
})

socket.on('error', msg => {
  const errorMessage = ErrorMessage.toClass(msg)
  console.error(errorMessage.error)
})

export default socket
