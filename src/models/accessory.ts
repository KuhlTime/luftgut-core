import Characteristic from './characteristic'

/**
 * An accessory can be anything from a gas sensor to a sysmograph
 */
class Accessory {
  name: string

  /**
   * List of characteristic the accessory possesses.
   */
  private characteristics: Characteristic[] = []

  /**
   * Adds a new `Characterstic` to the manged `characterisitics` array.
   * @param characteristic The new `Charaterisitc` that should be managed.
   */
  addCharacterstic(characteristic: Characteristic): void {
    this.characteristics.push(characteristic)
  }

  /**
   * Removes a characterstic from the `characterstics` array.
   * @param characteristic The `Characteristic` that should get removed.
   */
  removeCharacterstic(characteristic: Characteristic): void {
    const index = this.characteristics.indexOf(characteristic)
    this.characteristics.splice(index, 1)
  }
}

export default Accessory
