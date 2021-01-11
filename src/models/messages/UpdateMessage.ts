import Message from './Message'
import { Hook } from '@/models'
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
  hooks: Hook[]
  wifiName: string
  ip: string
  updateIntervalSeconds: number

  constructor(
    isAuthenticated: boolean,
    isStationSetup: boolean,
    deviceId: string,
    hooks: Hook[],
    wifiName: string,
    ip: string,
    updateIntervalSeconds: number,
    user?: firebase.User
  ) {
    super()

    this.isAuthenticated = isAuthenticated
    this.user = user
    this.isStationSetup = isStationSetup
    this.hooks = hooks
    this.deviceId = deviceId
    this.wifiName = wifiName
    this.ip = ip
    this.updateIntervalSeconds = updateIntervalSeconds
  }
}
