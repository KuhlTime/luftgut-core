import { Router } from 'express'
import { Logger } from '@/lib/betterLog'
import { auth, isLoggedIn } from '@/firebase'

const better = new Logger('API')
const router = new Router()

router.get('/logout', (req, res) => {
  better.info('GET /signout')

  if (isLoggedIn()) {
    auth
      .signOut()
      .then(() => {
        res.send({ success: true, message: 'Successfully logged out' })
      })
      .catch(err => {
        better.error(err.message)
        res.status(500).send({ success: false, message: err.message })
      })
  } else {
    res.send({ success: true, message: 'Already logged out' })
  }
})

export default router
