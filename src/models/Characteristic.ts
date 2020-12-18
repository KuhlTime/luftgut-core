class Characteristic<T> {
  /**
   * Represents the id under which the characteristic is known inside the firebase database
   */
  id: string

  /**
   * Initializes a new `Characterstic`
   * @param id Corrsponds to the id of the firebase capability.
   * @param valueProcessor Defines the way the values gets retrieved.
   */
  constructor(id: string, valueProcessor: () => T) {
    this.id = id
    this.getValue = valueProcessor
  }

  /**
   * Defines how the value gets retrived the logic inside can be
   * what every you like as long as the value that gets returned
   * is of Type `T`
   */
  getValue: () => T
}

export default Characteristic
