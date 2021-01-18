import station from '../../../station'
import { Logger } from '../../../lib/betterLog'

const better = new Logger('⚡︎Socket')

/**
 * Login Handler
 */
export default (): void => {
  better.info('Message: Force Upload')
  station.update()
}
