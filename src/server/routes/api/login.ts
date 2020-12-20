import { Router } from 'express'
import { Logger } from '@/lib/betterLog'
import { auth, isLoggedIn, stations } from '@/firebase'
import LoginPayload from '@/server/web/models/LoginPayload'
import getUniqueDeviceNumber from '@/lib/deviceNumber'

const better = new Logger('API')
const router = new Router()

router.post('/login', (req, res) => {
  better.info('POST /login')

  const body = req.body

  if (isLoggedIn()) {
    // There already is a user logged in
    // TODO: Should the current user be logged out and then the new user be logged in instead
    better.warn('Some user is already logged in')
    res.status(409).send({ success: false, message: 'There is already a user logged in.' })
  } else if (body as LoginPayload) {
    // Recieved valid payload
    // Try to sign into firebase
    auth
      .signInWithEmailAndPassword(body.email, Buffer.from(body.password, 'base64').toString('utf8'))
      .then(async user => {
        // Successfully logged into firebase
        // TODO: Check if user has the station configured

        const deviceNumber = await getUniqueDeviceNumber()
        const isConfigured = await isStationConfigured(deviceNumber)

        better.info(isConfigured ? 'Found Known Station' : 'New Station' + ` - ${deviceNumber}`)

        // TODO: Send configuration message
        // NOTE: Only upload all the detail. In case the user exits the configuration the setup could get more complicated
        res.send({ success: true, message: 'Login Successfull', data: user })
      })
      .catch(err => {
        // An error occured while logging into firebase
        better.error(err.message)
        res.status(400).send({ success: false, message: err.message })
      })
  } else {
    // The request body is invalid
    better.error('Invalid Payload')
    res.status(400).send({ success: false, message: 'Invalid Payload' })
  }
})

async function isStationConfigured(stationId: string) {
  const doc = await stations.doc(stationId).get()
  // TODO: Check if the owner matches the userId
  return doc.exists
}

export default router
