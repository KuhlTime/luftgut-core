import Message from './index'

/**
 * This is the setup message which either gets send on the initial setup
 * or when updating any device options.
 * @warning Do not include any computation.
 */
export default class SetupMessage extends Message {
  location: string

  // TODO: Add Hooks
}
