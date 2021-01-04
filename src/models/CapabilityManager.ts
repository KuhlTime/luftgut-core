import { firebase } from '../firebase'
import { v4 as uuid } from 'uuid'
import DataHook from './DataHook'

/**
 * A `CapabilityManager` is some sort of middleware that handles the data retrival as well as the
 * association to the right firebase endpoint.
 */
export default class CapabilityManager<T> {
  /* ------------------------------- Properties ------------------------------- */

  /**
   * A unique identifier for this `Capability`.
   */
  uuid: string = uuid()

  /**
   * A reference to a particular capability
   */
  capabilityReference: firebase.firestore.DocumentReference

  /**
   * Holds the `DataHook`. This is an asyncronous function for getting the data.
   * For example from a connected sensor.
   * @returns Returns a optional value of type `T`
   */
  getData: DataHook<T>

  /**
   * Stores the latestSnapshot of the capability
   */
  latestSnapshot?: firebase.firestore.DocumentSnapshot

  /**
   * The timestamp at which the last snapshot was downloaded
   */
  latestSnapshotTimestamp?: number

  /**
   * The time in milliseconds the snapshot is considered to be valid and
   * not gets redownloaded.
   */
  static snapshotExperationTime: number = 86400 * 1000

  /* ------------------------------- Constructor ------------------------------ */

  /**
   * Creates a new `CapabilityManager`
   * @param hook The hook is a reference to the paricular capability that should be used
   * @param dataRetriver Defines a function on how the data can be retrived from the accessory
   */
  constructor(reference: firebase.firestore.DocumentReference, hook: DataHook<T>) {
    this.capabilityReference = reference
    this.getData = hook
  }

  /* -------------------------------- Computed -------------------------------- */

  /**
   * Returns the id (name) of the capability this `CapabilityManager` is assigned to.
   */
  get capabilityId(): string {
    return this.capabilityReference.id
  }

  /* -------------------------------- Functions ------------------------------- */

  /**
   * Get document snapshot
   */
  async getCapabilitySnapshot(): Promise<firebase.firestore.DocumentSnapshot> {
    if (this.latestSnapshot) {
      // Check if chached value expired
      if (
        Date.now() - (this.latestSnapshotTimestamp + CapabilityManager.snapshotExperationTime) <=
        0
      ) {
        // Valid
        return this.latestSnapshot
      } else {
        // Expired
        this.latestSnapshot = undefined
        this.latestSnapshotTimestamp = undefined
      }
    }

    // get snapshot from firebase
    const doc = await this.capabilityReference.get()

    // error handling in case the reference doesn't exist
    if (doc.exists) {
      // store the snapshot
      this.latestSnapshot = doc
      this.latestSnapshotTimestamp = Date.now()
      return this.latestSnapshot
    } else {
      throw Error(`Capability ${this.capabilityReference.id} not found`)
    }
  }

  /**
   * Check if the type conforms to the specified value type
   * @param type The type that should be checked
   */
  async typeCheck(type: string): Promise<boolean> {
    const data = (await this.getCapabilitySnapshot()).data()
    return data.type.toLowerCase() === type.toLowerCase()
  }
}
