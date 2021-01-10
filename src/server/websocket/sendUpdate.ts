import broadcast from './broadcast'
import createUpdateMessage from '@/server/websocket/createUpdateMessage'
import { Logger } from '@/lib/betterLog'

const better = new Logger('Socket.io')

/**
 * This sends updated information to all connected clients
 */
export default async function update(): Promise<void> {
  // Bundle update
  better.info('Broadcast Update')
  const message = await createUpdateMessage()
  broadcast('update', message)
}
