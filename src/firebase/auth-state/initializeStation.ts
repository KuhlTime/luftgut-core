import * as fb from '..'
import getUniqueDeviceNumber from '../../lib/deviceNumber'

/**
 * This function sets up the stations data on firebase. Such as assigning an owner to the station.
 */
export default async function initializeStation(): Promise<void> {
  const user = fb.getCurrentUser()
  const uid = user.uid
  const deviceId = await getUniqueDeviceNumber()

  fb.stations.doc(deviceId).set({ owner: uid }, { merge: true })
}
