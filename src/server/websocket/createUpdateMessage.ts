import * as fb from '../../firebase'
import { UpdateMessage } from '../../models/messages'
import getUniqueDeviceNumber from '../../lib/deviceNumber'
import station from '../../station'
import wifiName from 'wifi-name'
import ip from 'ip'

/**
 * Creates a new Update Message
 */
export default async (): Promise<UpdateMessage> => {
  const deviceId = await getUniqueDeviceNumber()

  return new UpdateMessage(
    fb.isLoggedIn(),
    await fb.checkStationExists(deviceId),
    deviceId,
    station.hooks,
    await wifiName(),
    ip.address(),
    station.updateIntervalSeconds,
    fb.getCurrentUser()
  )
}
