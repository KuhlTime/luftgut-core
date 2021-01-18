import io from './index'
import { Message } from '../../models/messages'
import { Logger } from '../../lib/betterLog'

const better = new Logger('Socket.io')

/**
 * Broadcasts a message to all connected clients
 * @param event The name of the event
 * @param message {Message} The Message that should be broadcasted
 */
export default function broadcast(event: string, message: Message): void {
  better.info(`Broadcast - ${event}`)
  io.emit(event, message)
}
