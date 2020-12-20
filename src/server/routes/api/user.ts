import { Router } from 'express'
import { Logger } from '@/lib/betterLog'
import { isLoggedIn, getCurrentUser } from '@/firebase'

const better = new Logger('API')
const router = new Router()

router.get('/user', (req, res) => {
  better.info('GET /user')
  if (isLoggedIn()) {
    res.send({ success: true, message: 'Successfully retrived user data', data: getCurrentUser() })
  } else {
    res.send({ success: false, message: 'No user logged in' })
  }
})

export default router
