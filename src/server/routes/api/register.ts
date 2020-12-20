import { Router } from 'express'
import { Logger } from '@/lib/betterLog'
import { auth, isLoggedIn } from '@/firebase'
import LoginPayload from '@/server/web/models/LoginPayload'

const better = new Logger('API')
const router = new Router()

router.post('/register', (req, res) => {
  better.info('POST /register')
  const body = req.body

  if (isLoggedIn()) {
    res.send({ success: false, message: 'There is already a user logged in. Please logout first.' })
    better.warn('Some user is already logged in')
    return
  }

  // Validate
  if (body as LoginPayload) {
    auth.createUserWithEmailAndPassword(
      body.email,
      Buffer.from(body.password, 'base64').toString('utf8')
    )
  } else {
    res.send({ success: false, message: 'Invalid Payload' })
    better.error('Invalid Payload')
  }
})

export default router
