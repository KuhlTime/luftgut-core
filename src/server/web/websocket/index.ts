import { io } from 'socket.io-client'
import { ErrorMessage, UpdateMessage } from '../../../models/messages'

const socket = io()

socket.on('update', msg => {
  const updateMessage = UpdateMessage.toClass(msg)
  console.dir(updateMessage)
})

socket.on('error', msg => {
  const errorMessage = ErrorMessage.toClass(msg)
  console.error(errorMessage.error)
})
