/**
 * The `DataHook` is a function that gets attached to a `CapabilityManager`.
 * When `getData` gets called on the `CapabilityManager` this callback
 * function gets executed and keeps the instructions for recieving the wanted data.
 * E.g. from a connected Sensor.
 * @returns The callback returns a Promise which might fails if there is an error while executing the callback
 */
type DataHook<T> = () => Promise<T>

export default DataHook
