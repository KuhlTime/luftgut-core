import { firebase, capabilities } from '../firebase'

export default class Capability {
  id: string
  icon?: string
  nameDe?: string
  type: string
  unit?: string
  roundTo?: number

  constructor(documentSnapshot: firebase.firestore.DocumentSnapshot) {
    this.id = documentSnapshot.id

    const data = documentSnapshot.data()
    this.icon = data.icon
    this.nameDe = data.name.de
    this.type = data.type
    this.unit = data.unit
    this.roundTo = data.roundTo
  }

  /**
   * Get all capabilites from firebase and store them in an array of Capability models
   */
  static async getCapabilities(): Promise<Capability[]> {
    const snapshots = await capabilities.get()

    const array: Capability[] = []

    snapshots.forEach(snap => {
      array.push(new Capability(snap))
    })

    return array
  }
}
