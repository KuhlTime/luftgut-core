import fs from 'fs'
import path from 'path'
import https from 'https'
import express from 'express'
import cors from 'cors'

import { Logger } from '../lib/betterLog'
const better = new Logger('⟐ Express')

import unless from '../lib/unless'
import parcelBundler from './middleware/parcel'

import io from './websocket'

const env = process.env.NODE_ENV || 'development'
better.info(`${env} mode enabled`)

const app = express()

const PORT = 443

// === SETUP CORS ===

const corsOptions = {
  origin: 'https://luftgut.de',
  optionsSuccessStatus: 200
}

// Allows CORS (Cross-Origin Ressource Sharing)
/*if (env === 'development') {
  app.use(
    cors({
      origin: '*'
    })
  )
} else {
  app.use(cors(corsOptions))
}*/
app.use(cors({ origin: '*' }))

// === SETUP SSL ===

// Load the keys
// https://stackoverflow.com/a/24283204/4179020
const privateKeyPath = path.join(__dirname, 'ssl/server.key')
const privateKey = fs.readFileSync(privateKeyPath, 'utf8')
const certificatePath = path.join(__dirname, 'ssl/server.cert')
const certificate = fs.readFileSync(certificatePath, 'utf8')

// In case the key is configured to use a passphrase add a `passphrase` property to the object.
const serverOptions = {
  key: privateKey,
  cert: certificate
  // requestCert: false,
  // rejectUnauthorized: false
}

// === SETUP ROUTES ===

app.use(unless(parcelBundler.middleware(), '/socket.io'))

// === SETUP SERVER ===

const server = https.createServer(serverOptions, app)

// === SETUP SOCKET.IO ===

io.attach(server)

// === START SERVER ===

server.listen(PORT, () => {
  const address = server.address() as { port: number }
  better.info(`Server listening on Port ${address.port}`)
})

export { privateKeyPath, certificatePath }
