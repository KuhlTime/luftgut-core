import * as fb from '@/firebase'
import getUniqueDeviceNumber from '@/lib/deviceNumber'

/**
 * This function creates a relation to the logged in user and the station object.
 */
export default async function setOwner(): Promise<void> {
  const user = fb.getCurrentUser()
  const uid = user.uid
  const deviceId = await getUniqueDeviceNumber()

  fb.stations.doc(deviceId).set({ owner: uid }, { merge: true })
}
