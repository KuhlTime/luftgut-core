import { firebase } from '../firebase'
import CapabilityManager from './CapabilityManager'
import Datapoint from './Datapoint'

/**
 * The station class communicates with the firestore database and manages available
 * capabilities.
 */
export default class Station {
  /* ------------------------------- Properties ------------------------------- */

  /**
   * The firestore reference to the station
   */
  stationReference: firebase.firestore.DocumentReference

  /**
   * A list of active `CapabilityManagers`
   */
  managers: CapabilityManager<any>[] = []

  /* ------------------------------- Constructor ------------------------------ */

  /**
   * Creates a new station instance
   * @param reference The firestore reference to the station
   * @param initManagers Optionally provide an array of `CapabilityManagers`.
   */
  constructor(
    reference: firebase.firestore.DocumentReference,
    initManagers: CapabilityManager<any>[] = []
  ) {
    this.stationReference = reference
    this.managers = initManagers
  }

  /* -------------------------------- Computed -------------------------------- */

  get hasActiveManagers(): boolean {
    return this.managers.length > 0
  }

  /**
   * Returns the reference to the stations datapoints subcollection
   */
  get datapoints(): firebase.firestore.CollectionReference {
    return this.stationReference.collection('datapoints')
  }

  /* --------------------------------- Methods -------------------------------- */

  /**
   * Add a new `CapabilityManager` that should be called when the station updates.
   * In case a manager for the defined Capability already exists the one gets overwritten.
   * @param newManager The manager that should be activated
   * @param overwrite Should a already existing manager be overwritten
   * @returns Returns whether the manager has been activated or not
   */
  activate(newManager: CapabilityManager<any>, overwrite: boolean = true): boolean {
    // Check that there not already exists a manager for a given capability.
    // In case there is the one gets replaced by the new one
    this.managers.forEach((manager, index) => {
      if (manager.capabilityId == newManager.capabilityId) {
        if (overwrite) {
          // replace pre existing manager
          this.managers[index] = newManager
          return true
        } else {
          // pre existing manager has not been overwritten
          return false
        }
      }
    })

    // If the manager doesn't already exist, activate the newManager
    this.managers.push(newManager)
    return true
  }

  /**
   * Remove a `CapabilityManager` so it o longer gets called on `update`.
   */
  deactivate(manager: CapabilityManager<any>) {
    const index = this.managers.indexOf(manager)
    if (index > -1) {
      this.managers.splice(index, 1)
    }
  }

  /**
   * Remove a `CapabilityManager` by its id.
   * @param id The uuid of the hook to be removed.
   */
  deactivateByUuid(uuid: string) {
    const manager: CapabilityManager<any> | undefined = this.managers.find(m => m.uuid === uuid)
    if (manager) this.deactivate(manager)
  }

  /**
   * Retrives all hooks and updates the data inside the database.
   */
  // TODO: Add Error handling
  async update() {
    // In case there are no managers active skip the update process
    if (!this.hasActiveManagers) {
      console.log('No active managers. Skip upload.')
      return
    }

    const datapoint = new Datapoint()

    // get the data for each registered manager
    for (const manager of this.managers) {
      // This gets the data from the sensor
      const data = await manager.getData()

      // Guard that the data type matches the one specified inside fb capability
      // in case it does match proceed
      if (!manager.typeCheck(typeof data)) {
        throw Error(
          `Manager return type doesn't match required return type for ${manager.capabilityReference.id}`
        )
      }

      // Add data to the datapoint
      datapoint.addData(manager.capabilityId, data)
    }

    // Guard that the datapoint is not empty
    if (datapoint.isEmpty) {
      console.log('Datapoint has no data. Skip upload.')
      return
    }

    await this.datapoints.doc(datapoint.documentId).set(datapoint.toObject())

    console.log('New datapoint uploaded.')
  }
}
