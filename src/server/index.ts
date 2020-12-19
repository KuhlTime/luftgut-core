import fs from 'fs'
import path from 'path'
import https from 'https'
import express from 'express'
import bodyParser from 'body-parser'
import Bundler from 'parcel-bundler'
import cors from 'cors'

import { auth, isLoggedIn, getCurrentUser } from '../firebase'

import { Logger } from '../lib/betterLog'
const better = new Logger('Express')

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
const privateKeyPath = path.join(__dirname, 'ssl/key.pem')
const privateKey = fs.readFileSync(privateKeyPath, 'utf8')
const certificatePath = path.join(__dirname, 'ssl/server.cert')
const certificate = fs.readFileSync(certificatePath, 'utf8')

// In case the key is configured to use a passphrase add a `passphrase` property to the object.
const credentials = { key: privateKey, cert: certificate }

// === SETUP PARCEL ===

// defines the website folder
const srcFile = path.join(__dirname, 'web/index.html')
const parcelOptions = {
  sourceMaps: false,
  logLevel: env === 'development' ? 3 : 0,
  https: {
    key: privateKeyPath,
    cert: certificatePath
  }
}
const bundler = new Bundler(srcFile, parcelOptions)

app.use(bundler.middleware())

// === SETUP EXPRESS ===

app.use(bodyParser.json())

app.get('/cert', (req, res) => {
  better.info('GET /cert')
  res.download(path.join(__dirname, 'ssl/server.cert'), 'luftgut.cert')
})

app.get('/user', (req, res) => {
  better.info('GET /user')
  if (isLoggedIn()) {
    res.send({ success: true, message: 'Successfully retrived user data', data: getCurrentUser() })
  } else {
    res.send({ success: false, message: 'No user logged in' })
  }
})

app.post('/login', (req, res) => {
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

app.post('/register', (req, res) => {
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

app.get('/logout', (req, res) => {
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

// === START SERVER ===

const httpsServer = https.createServer(credentials, app)

httpsServer.listen(443, () => {
  better.info('Server listening on Port 443')
})
