import broadcast from './broadcast'
import createUpdateMessage from '@/server/websocket/createUpdateMessage'

/**
 * This sends updated information to all connected clients
 */
export default async function update(): Promise<void> {
  // Bundle update
  const message = await createUpdateMessage()
  broadcast('update', message)
}
