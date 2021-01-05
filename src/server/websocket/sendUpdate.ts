import broadcast from './broadcast'
import createUpdateMessage from '@/server/websocket/createUpdateMessage'

/**
 * This sends updated information to all connected clients
 */
export default function update(): void {
  // Bundle update
  broadcast('update', createUpdateMessage())
}
