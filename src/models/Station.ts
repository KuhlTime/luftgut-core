import { firebase, checkStationExists, stations, capabilities, isLoggedIn } from '../firebase'
import { Hook } from './'
import Datapoint from './Datapoint'
import getUniqueDeviceNumber from '../lib/deviceNumber'
import { Logger } from '../lib/betterLog'
import broadcast from '../server/websocket/broadcast'
import { ErrorMessage } from './messages'
import * as ts from 'typescript'
import lowdb from '../db'

const better = new Logger('☁ Station')

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

  updateIntervalSeconds: number

  /**
   * Creates a new station instance
   */
  constructor(updateIntervalSeconds = 60) {
    this.updateIntervalSeconds = updateIntervalSeconds

    // Bind this (station) to the update message otherwise the update function will
    // use the timer as the binding and will not have access to the stations methods
    this.timer = setInterval(this.update.bind(this), this.updateIntervalSeconds * 1000)

    const dbHooks = lowdb.get('hooks').value()

    capabilities.get().then(snapshots => {
      // FIXME: This may fail if the update gets send immediately
      // TODO: Check for new Capabilites

      snapshots.forEach(capabilitySnapshot => {
        // If there
        const storedHook = dbHooks[capabilitySnapshot.id] as Partial<{
          code: string
          active: boolean
        }>

        const newHook = new Hook(
          capabilitySnapshot,
          storedHook?.code ?? '',
          storedHook?.active ?? false
        )
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

    if (index !== undefined) {
      this.hooks[index] = hook
    } else {
      this.hooks.push(hook)
    }

    this.hooks.sort((a, b) => {
      if (a.capability.required === b.capability.required) {
        // Secondary
        return a.capability.nameDe > b.capability.nameDe ? 1 : -1
      } else {
        // Priority
        return a.capability.required > b.capability.required ? -1 : 1
      }
    })

    // store hook in db
    lowdb
      .set(`hooks.${hook.capability.id}.code`, hook.code)
      .set(`hooks.${hook.capability.id}.active`, hook.active)
      .write()
  }

  indexOf(hook: Hook): number | undefined {
    const index = this.hooks.findIndex(h => h.capability.id === hook.capability.id)
    return index === -1 ? undefined : index
  }

  updateHooks(hooks: Hook[]): void {
    hooks.forEach(hook => this.add(hook))
  }

  async runHook(hook: Hook): Promise<any> {
    let value: any

    try {
      const transpiledCode = ts.transpile(`(async () => { ${hook.code} })()`)
      value = await eval(transpiledCode)
    } catch (error) {
      better.error(`Error while executing hook ${hook.capability.id}:\n${error}`)
      broadcast('error', new ErrorMessage(error, hook.capability.id))
    }

    return value
  }

  /**
   * Retrives all hooks and updates the data inside the database.
   */
  async update(): Promise<void> {
    // When no user is logged in skip the update
    if (!isLoggedIn()) {
      return
    }

    // Check if station is setup correctly
    const stationExists = await this.stationExists()
    if (!stationExists) {
      better.info('The Station is not setup correctly')
      return
    }

    // Check if all required hooks are enabled
    const invalidHooks = this.hooks.filter(h => !h.valid)

    if (invalidHooks.length > 0) {
      better.warn('Not all required hooks are enabled. Skip Upload')
      better.warn('Missing Hooks: ' + invalidHooks.map(h => h.capability.id).join(', '))
      return
    }

    // Get all hooks marked as active
    const activeHooks = this.hooks.filter(h => h.active)

    const datapoint = new Datapoint()

    // get the data for each active hook
    for (const hook of activeHooks) {
      // When the hook is invalid skip to the next hook

      // This gets the data from the sensor
      let data = await this.runHook(hook)

      // Return type does not match required type
      if ((typeof data).toLowerCase() !== hook.capability.type.toLowerCase()) {
        better.error(
          '' +
            hook.capability.id +
            ' type "' +
            typeof data +
            '" doesn\'t match required type "' +
            hook.capability.type +
            '"'
        )
        return
      }

      // Round Number to decimal place
      if (
        hook.capability.roundTo !== undefined &&
        hook.capability.type.toLowerCase() === 'number'
      ) {
        if (hook.capability.roundTo === 0) {
          data = Math.round(data)
        } else {
          const factor = Math.pow(10, hook.capability.roundTo)
          data = Math.round(data * factor) / factor
        }
      }

      // Add data to the datapoint
      datapoint.addData(hook.capability.id, data)
    }

    // Guard that the datapoint is not empty
    if (datapoint.isEmpty) {
      better.warn('Datapoint has no data. Skip upload.')
      return
    }

    const datapointReference = await this.getDatapointReference()

    try {
      // In case the datepoint has invalid format a error gets thrown by firebase
      await datapointReference.doc(datapoint.documentId).set(datapoint.toObject())
    } catch (error) {
      better.error(
        `Error while executing update:\n${error.message}\n\n${JSON.stringify(datapoint)}`
      )
      return
    }

    better.info('Uploaded new Datapoint')
  }
}
