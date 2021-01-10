import { DataHook } from '../../models'

/**
 * Returns a random number between 0 and 100
 */
const templateHook: DataHook<number> = async () => {
  return Math.random() * 100
}

export default templateHook
