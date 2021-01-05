import { io } from 'socket.io-client'
import { UpdateMessage } from '../../../models/messages'

const socket = io()

socket.on('update', msg => {
  const message = UpdateMessage.toClass(msg)
  console.dir(message)
})

socket.on('error', error => {
  console.error(error)
})
