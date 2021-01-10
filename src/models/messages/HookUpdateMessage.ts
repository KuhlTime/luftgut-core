import Message from './Message'
import Hook from '../Hook'

/**
 * Error Message
 * @warning Do not include any computation.
 */
export default class HookUpdateMessage extends Message {
  hooks: Hook[]

  constructor(hocks: Hook[]) {
    super()

    this.hooks = hocks
  }
}
