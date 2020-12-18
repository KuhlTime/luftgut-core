import Accessory from './Accessory'

class Station {
  id: string

  /**
   * Keeps an array of all the accesories manged by this station.
   */
  private accessories: Accessory[] = []
}

export default Station
