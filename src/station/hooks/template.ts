import { Hook } from '../../models'

/**
 * Returns a random number between 0 and 100
 */
const templateHook: Hook = new Hook('temperature', 'return Math.random() * 30', true)

export default templateHook
