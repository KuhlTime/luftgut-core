import 'process'

/**
 * DataRecord is a typealias for a simple JSON object.
 * @description It is recommended to use a `Record` type instead of the `object` type.
 */
type DataRecord = Record<string, unknown>

/**
 * A `Datapoint` holds data to be uploaded to firebase.
 */
export default class Datapoint {
  /* ------------------------------- Properties ------------------------------- */

  /**
   * The timestamp the data point was created
   */
  created: Date = new Date()

  /**
   * The data stored inside the `Datapoint`.
   * The key represents the id of the capability
   */
  data: DataRecord

  /**
   * The environment in which the `Datapoint` got created. (development / production)
   */
  environment: string

  /* ------------------------------- Constructor ------------------------------ */

  constructor(data: DataRecord = {}) {
    this.data = data
    this.environment = process.env.NODE_ENV ?? 'development'
  }

  /* -------------------------------- Computed -------------------------------- */

  /**
   * Returns whether the `Datapoint` contains any data
   * @returns {boolean} Returns boolean
   */
  get isEmpty(): boolean {
    return Object.keys(this.data).length === 0
  }

  /**
   * Returns a string to use as the id for the new firestore document
   */
  get documentId(): string {
    return this.created.toISOString()
  }

  /* --------------------------------- Methods -------------------------------- */

  /**
   * Add a new data value to the `Datapoint`
   * @param key The id of the capability that gets referenced
   * @param value The value that should be stored
   */
  addData(key: string, value: string): void {
    this.data[key] = value
  }

  /**
   * Converts the `Datapoint` to a plain JavaScript object
   */
  toObject(): Record<string, unknown> {
    return Object.assign({}, this) as Record<string, unknown>
  }
}
