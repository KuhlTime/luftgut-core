import { io } from 'socket.io-client'
import { Message, Update } from '@/models/messages'

const socket = io()

socket.on('update', data => {
  console.log(data as Message<Update>)
})
