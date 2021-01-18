import { Server } from 'socket.io'
import { Logger } from '../../lib/betterLog'
import * as handler from './events'
import sendUpdate from './sendUpdate'

const better = new Logger('Socket.io')

/**
 * Options for the socket.io server.
 * See avaialable options:
 * https://socket.io/docs/v3/server-api/#new-Server-httpServer-options
 */
const options = {
  cors: {
    origin: '*'
  }
}

/**
 * socket.io server
 */
const io = new Server(options)

io.on('connection', socket => {
  better.info(`Connected to: ${socket.id}`)

  // Send initial update
  sendUpdate()

  // Event Handlers
  socket.on('disconnect', () => {
    better.info(`Disconnected from: ${socket.id}`)
  })
  socket.on('login', handler.onLogin)
  socket.on('logout', handler.onLogout)
  socket.on('forceUpdate', handler.onForceUpdate)
  socket.on('forceUpload', handler.onForceUpload)
  socket.on('hookUpdate', handler.onHookUpdate)
})

/**
 * Export socket.io server
 */
export default io
