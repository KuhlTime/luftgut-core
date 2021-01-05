import io from './index'
import { Message } from '@/models/messages'

/**
 * Broadcasts a message to all connected clients
 * @param event The name of the event
 * @param message {Message} The Message that should be broadcasted
 */
export default function broadcast(event: string, data: unknown): void {
  io.emit(event, new Message(data))
}
