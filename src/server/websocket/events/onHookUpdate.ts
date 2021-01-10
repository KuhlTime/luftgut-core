import { Logger } from '@/lib/betterLog'
import sendUpdate from '../sendUpdate'
import { HookUpdateMessage } from '@/models/messages'
import station from '@/station'

const better = new Logger('Socket.io')

/**
 * Login Handler
 */
export default (message: HookUpdateMessage): void => {
  better.info('Message: Hook Update')

  station.updateHooks(message.hooks)

  sendUpdate()
}
