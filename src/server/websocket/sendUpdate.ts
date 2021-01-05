import broadcast from './broadcast'
import createUpdateMessage from '@/firebase/createUpdateMessage'

/**
 * This sends updated information to all connected clients
 */
export default function update(): void {
  // Bundle update
  broadcast('update', createUpdateMessage())
}
