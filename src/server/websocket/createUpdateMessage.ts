import * as fb from '@/firebase'
import { UpdateMessage } from '@/models/messages'
import getUniqueDeviceNumber from '@/lib/deviceNumber'

/**
 * Creates a new Update Message
 */
export default async (): Promise<UpdateMessage> => {
  const deviceId = await getUniqueDeviceNumber()

  return new UpdateMessage(
    fb.isLoggedIn(),
    await fb.checkStationExists(deviceId),
    deviceId,
    fb.getCurrentUser()
  )
}
