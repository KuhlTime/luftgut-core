import fs from 'fs'
import path from 'path'
import https from 'https'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import unless from './lib/unless'

import apiRouter from './routes/api'
import parcelMiddleware from './routes/parcel-middleware'

import { Logger } from '../lib/betterLog'
const better = new Logger('Express')

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

// === SETUP BODYPARSER ===

app.use(bodyParser.json())

// === SETUP SSL ===

// Load the keys
// https://stackoverflow.com/a/24283204/4179020
const privateKeyPath = path.join(__dirname, 'ssl/key.pem')
const privateKey = fs.readFileSync(privateKeyPath, 'utf8')
const certificatePath = path.join(__dirname, 'ssl/server.cert')
const certificate = fs.readFileSync(certificatePath, 'utf8')

// In case the key is configured to use a passphrase add a `passphrase` property to the object.
const credentials = { key: privateKey, cert: certificate }

// === SETUP ROUTES ===

app.use('/api', apiRouter)
app.use(unless(parcelMiddleware, '/api'))

// === START SERVER ===

const httpsServer = https.createServer(credentials, app)

httpsServer.listen(443, () => {
  better.info('Server listening on Port 443')
})

export { privateKeyPath, certificatePath }
