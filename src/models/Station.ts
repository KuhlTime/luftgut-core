import { firebase, checkStationExists, stations, capabilities } from '../firebase'
import { Hook } from './'
import Datapoint from './Datapoint'
import getUniqueDeviceNumber from '@/lib/deviceNumber'

/**
 * The station class communicates with the firestore database and manages available
 * capabilities.
 */
export default class Station {
  /* ------------------------------- Properties ------------------------------- */

  /**
   * A list of managed hooks
   */
  hooks: Hook[] = []

  /**
   * The reference to the interval timer
   */
  timer: NodeJS.Timeout

  /* ------------------------------- Constructor ------------------------------ */

  /**
   * Creates a new station instance
   */
  constructor() {
    // Activate timer
    const seconds = 60

    // Bind this (station) to the update message otherwise the update function will
    // use the timer as the binding and will not have access to the stations methods
    this.timer = setInterval(this.update.bind(this), seconds * 1000)

    capabilities.get().then(snapshots => {
      // FIXME: This may fail if the update gets send immediately
      // TODO: Check for new Capabilites
      snapshots.forEach(capabilitySnapshot => {
        const newHook = new Hook(capabilitySnapshot, '', false)
        this.add(newHook)
      })
    })
  }

  /* -------------------------------- Computed -------------------------------- */

  get hasActiveHooks(): boolean {
    return this.hooks.filter(h => h.active).length > 0
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
   * This adds or updates a hook for a capability
   */
  add(hook: Hook): void {
    const index = this.indexOf(hook)

    if (index) {
      this.hooks[index] = hook
    } else {
      this.hooks.push(hook)
    }
  }

  indexOf(hook: Hook): number | undefined {
    const index = this.hooks.findIndex(h => h.capability.id === hook.capability.id)
    return index === -1 ? undefined : index
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

    const activeHooks = this.hooks.filter(h => h.active)

    const datapoint = new Datapoint()

    // get the data for each active hook
    for (const hook of activeHooks) {
      // When the hook is invalid skip to the next hook
      if (!hook.isValid) continue

      // This gets the data from the sensor
      const data = await hook.getData()

      // TODO: Check the hook return the right type

      // Add data to the datapoint
      datapoint.addData(hook.capability.id, data)
    }

    // Guard that the datapoint is not empty
    if (datapoint.isEmpty) {
      console.log('Datapoint has no data. Skip upload.')
      return
    }

    const datapointReference = await this.getDatapointReference()
    await datapointReference.doc(datapoint.documentId).set(datapoint)

    console.log('New datapoint uploaded.')
  }
}
