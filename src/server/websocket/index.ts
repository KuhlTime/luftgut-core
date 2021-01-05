import { Server } from 'socket.io'
import { Logger } from '@/lib/betterLog'
import * as handler from './events'
import sendUpdate from './sendUpdate'

const better = new Logger('Socket.io')

/**
 * Options for the socket.io server.
 * See avaialable options:
 * https://socket.io/docs/v3/server-api/#new-Server-httpServer-options
 */
const options = {}

/**
 * socket.io server
 */
const io = new Server(options)

io.on('connection', socket => {
  better.info(`Established new connection: ${socket.id}`)

  // Send initial update
  sendUpdate()

  // Event Handlers
  socket.on('login', handler.onLogin)
  socket.on('logout', handler.onLogout)
})

/**
 * Export socket.io server
 */
export default io