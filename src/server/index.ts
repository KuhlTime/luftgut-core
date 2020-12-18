import fs from 'fs'
import path from 'path'
import https from 'https'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import { auth, isLoggedIn, getCurrentUser } from '../firebase'

import SetupObject from '../models/SetupObject'

const env = process.env.NODE_ENV || 'development'
console.log(`Launching server in: ${env}`)

const app = express()

// === SETUP CORS ===

const corsOptions = {
  origin: 'https://luftgut.de',
  optionsSuccessStatus: 200
}

// Allows CORS (Cross-Origin Ressource Sharing)
if (env === 'development') {
  app.use(cors())
} else {
  app.use(cors(corsOptions))
}

// === SETUP SSL ===

// Load the keys
// https://stackoverflow.com/a/24283204/4179020
const privateKey = fs.readFileSync(path.join(__dirname, 'ssl/key.pem'), 'utf8')
const certificate = fs.readFileSync(path.join(__dirname, 'ssl/server.cert'), 'utf8')

// In case the key is configured to use a passphrase add a `passphrase` property to the object.
const credentials = { key: privateKey, cert: certificate }

// === SETUP EXPRESS ===

app.use(bodyParser.json())

app.get('/', (req, res) => {
  console.log('[REQUEST]: GET /')
  res.send({ success: true, message: 'Hello from your Luftgut Weather Station!' })
})

app.get('/cert', (req, res) => {
  console.log('[REQUEST]: GET /cert')
  res.download(path.join(__dirname, 'ssl/server.cert'), 'luftgut.cert')
})

app.get('/user', (req, res) => {
  console.log('[REQUEST]: GET /user')
  if (isLoggedIn()) {
    res.send({ success: true, message: 'Successfully retrived user data', data: getCurrentUser() })
  } else {
    res.send({ success: false, message: 'No user logged in' })
  }
})

app.post('/login', (req, res) => {
  console.log('[REQUEST]: POST /login')

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

app.post('/register', (req, res) => {
  console.log('[REQUEST]: POST /register')
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

app.get('/logout', (req, res) => {
  console.log('[REQUEST]: GET /signout')

  if (isLoggedIn()) {
    auth
      .signOut()
      .then(() => {
        res.send({ success: true, message: 'Successfully logged out' })
      })
      .catch(err => {
        console.error(err.message)
        res.status(500).send({ success: false, message: err.message })
      })
  } else {
    res.send({ success: false, message: 'No user to log out' })
  }
})

// === START SERVER ===

const httpsServer = https.createServer(credentials, app)

httpsServer.listen(443, () => {
  console.log('HTTPS-Server listening on Port 443')
})
