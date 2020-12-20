import { Router } from 'express'
import { auth, isLoggedIn, getCurrentUser } from '../../firebase'
import { Logger } from '../../lib/betterLog'
import { certificatePath } from '../index'

const better = new Logger('API')

const apiRouter = new Router()

apiRouter.get('/cert', (req, res) => {
  better.info('GET /cert')
  res.download(certificatePath, 'luftgut.cert')
})

apiRouter.get('/user', (req, res) => {
  better.info('GET /user')
  if (isLoggedIn()) {
    res.send({ success: true, message: 'Successfully retrived user data', data: getCurrentUser() })
  } else {
    res.send({ success: false, message: 'No user logged in' })
  }
})

apiRouter.post('/login', (req, res) => {
  better.info('POST /login')

  const body = req.body

  if (isLoggedIn()) {
    res.send({ success: false, message: 'There is already a user logged in' })
  } else {
    auth
      .signInWithEmailAndPassword(body.email, Buffer.from(body.password, 'base64').toString('utf8'))
      .then(user => {
        res.send({ success: true, message: 'Login Successfull', data: user })
      })
      .catch(err => {
        res.send({ success: false, message: err.message })
      })
  }
})

apiRouter.post('/register', (req, res) => {
  better.info('POST /register')
  const body = req.body

  if (isLoggedIn()) {
    res.send({ success: false, message: 'There is already a user logged in.' })
    return
  }

  // Validate
  if (body.email && body.password) {
    auth.createUserWithEmailAndPassword(body.email, Buffer.from(body.password, 'base64').toString('utf8'))
  } else {
    res.send({ success: false, message: 'Missing username or password' })
  }
})

apiRouter.get('/logout', (req, res) => {
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
    res.send({ success: false, message: 'No user to log out' })
  }
})

export default apiRouter
