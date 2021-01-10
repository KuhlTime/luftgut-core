import Message from './Message'
import { Capability, ClientHook } from '@/models'
import { firebase } from '@/firebase'

/**
 * This messages holds any information needed by the client.
 * Sending all information at once ensures more flexablility
 * as well as less code to write on the client side.
 * @to Client
 * @warning Be carefull many of the objects may be undefined.
 * @warning Do not include any computation.
 */
export default class UpdateMessage extends Message {
  // TODO: Add comments
  isAuthenticated: boolean
  user?: firebase.User
  isStationSetup: boolean
  deviceId: string
  capabilities: Capability[]
  hooks: ClientHook[]

  constructor(
    isAuthenticated: boolean,
    isStationSetup: boolean,
    deviceId: string,
    capabilities: Capability[],
    hooks: ClientHook[],
    user?: firebase.User
  ) {
    super()

    this.isAuthenticated = isAuthenticated
    this.user = user
    this.isStationSetup = isStationSetup
    this.capabilities = capabilities
    this.hooks = hooks
    this.deviceId = deviceId
  }
}
