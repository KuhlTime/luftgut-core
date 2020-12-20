import { Router } from 'express'
import { Logger } from '@/lib/betterLog'
import { auth, isLoggedIn, stations } from '@/firebase'
import getUniqueDeviceNumber from '@/lib/deviceNumber'

const better = new Logger('API')
const router = new Router()

/**
 * The setup route sets attributes defined in the station setup.
 * This method can be used for updating values as well.
 */
router.post('/setup', (req, res) => {
  better.info('POST /setup')

  const body = req.body

  if (isLoggedIn()) {
    // TODO: Validate body
    console.log(body)
  } else {
    // The request body is invalid
    better.error('Not logged in')
    res.status(401).send({ success: false, message: 'Not logged in' })
  }
})

export default router
