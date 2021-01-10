import { firebase, checkStationExists, stations } from '../firebase'
import { CapabilityManager, ClientHook } from './'
import Datapoint from './Datapoint'
import getUniqueDeviceNumber from '@/lib/deviceNumber'

/**
 * The station class communicates with the firestore database and manages available
 * capabilities.
 */
export default class Station {
  /* ------------------------------- Properties ------------------------------- */

  /**
   * A list of active `CapabilityManagers`
   */
  managers: CapabilityManager<any>[] = []

  /**
   * The reference to the interval timer
   */
  timer: NodeJS.Timeout

  /* ------------------------------- Constructor ------------------------------ */

  /**
   * Creates a new station instance
   * @param reference The firestore reference to the station
   * @param initManagers Optionally provide an array of `CapabilityManagers`.
   */
  constructor() {
    // Activate timer
    const seconds = 60

    // Bind this (station) to the update message otherwise the update function will
    // use the timer as the binding and will not have access to the stations methods
    this.timer = setInterval(this.update.bind(this), seconds * 1000)
  }

  /* -------------------------------- Computed -------------------------------- */

  get hasActiveManagers(): boolean {
    return this.managers.length > 0
  }

  /**
   * Creates a object for each manager. To work with clientside
   */
  get hooks(): ClientHook[] {
    const hooks: ClientHook[] = []

    this.managers.forEach(manager => {
      hooks.push(new ClientHook(manager.capabilityReference.id, manager.getData.toString()))
    })

    return hooks
  }

  /* --------------------------------- Methods -------------------------------- */

  /**
   * Returns a reference to the stations document based on the id of the device
   */
  async getStationReference(): Promise<firebase.firestore.DocumentReference> {
    return stations.doc(await getUniqueDeviceNumber())
  }

  /**
   * Returns the reference to the stations datapoints subcollection
   */
  async getDatapointReference(): Promise<firebase.firestore.CollectionReference> {
    const stationReference = await this.getStationReference()
    return stationReference.collection('datapoints')
  }

  /**
   * Returns whether or not the station has been setup on firebase.
   */
  async stationExists(): Promise<boolean> {
    return await checkStationExists(await getUniqueDeviceNumber())
  }

  /**
   * Stops the scheduler from running
   */
  terminateTimer(): void {
    clearInterval(this.timer)
  }

  /**
   * Sets a new scheduler interval for the station to upload its data
   */
  setUpdateInterval(seconds: number): void {
    // Deactivate exisiting timer
    this.terminateTimer()

    // Set the job
    this.timer = setInterval(this.update.bind(this), seconds * 1000)
  }

  /**
   * Add a new `CapabilityManager` that should be called when the station updates.
   * In case a manager for the defined Capability already exists the one gets overwritten.
   * @param newManager The manager that should be activated
   * @param overwrite Should a already existing manager be overwritten
   * @returns Returns whether the manager has been activated or not
   */
  activate(newManager: CapabilityManager<any>, overwrite = true): boolean {
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
      } else {
        return false
      }
    })

    // If the manager doesn't already exist, activate the newManager
    this.managers.push(newManager)

    // TODO: Broadcast Update

    return true
  }

  /**
   * Remove a `CapabilityManager` so it o longer gets called on `update`.
   */
  deactivate(manager: CapabilityManager<any>): void {
    const index = this.managers.indexOf(manager)

    if (index > -1) {
      this.managers.splice(index, 1)
    }
  }

  /**
   * Remove a `CapabilityManager` by its id.
   * @param id The uuid of the hook to be removed.
   */
  deactivateByUuid(uuid: string): void {
    const manager: CapabilityManager<any> | undefined = this.managers.find(m => m.uuid === uuid)
    if (manager) this.deactivate(manager)
  }

  /**
   * Retrives all hooks and updates the data inside the database.
   */
  async update(): Promise<void> {
    // Check if station is setup correctly
    const stationExists = await this.stationExists()
    if (!stationExists) {
      console.log('The Station is not setup correctly')
      return
    }

    // In case there are no managers active skip the update process
    if (!this.hasActiveManagers) {
      // console.log('No active managers. Skip upload.')
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
        return
      }

      // Add data to the datapoint
      datapoint.addData(manager.capabilityId, data)
    }

    // Guard that the datapoint is not empty
    if (datapoint.isEmpty) {
      console.log('Datapoint has no data. Skip upload.')
      return
    }

    const datapointReference = await this.getDatapointReference()
    await datapointReference.doc(datapoint.documentId).set(datapoint.toObject())

    console.log('New datapoint uploaded.')
  }
}
