import path from 'path'
import Bundler from 'parcel-bundler'
import { Logger } from '../../lib/betterLog'

const better = new Logger('⚒ Parcel')

const env = process.env.NODE_ENV || 'development'

// defines the website folder
const srcFile = path.join(__dirname, '../web/index.html')

const parcelOptions = {
  sourceMaps: false,

  // Change the logLevel to get the messages from parcels internal logger
  // 3 - all, 2 - warnings, 1 - errors, 0 - silent
  logLevel: 0,
  https: {
    key: path.join(__dirname, '../ssl/key.pem'),
    cert: path.join(__dirname, '../ssl/cert.pem')
  }
}

const bundler = new Bundler(srcFile, parcelOptions)

var isBuilding = false

function delayedInfo(timeoutSeconds: number, message: string) {
  setTimeout(() => {
    if (isBuilding) better.info(message)
  }, timeout * 1000)
}

bundler.on('buildStart', () => {
  isBuilding = true

  better.info('Started Build')

  // In case the build takes longer than expected let the user know
  delayedInfo(
    40,
    'If this is the first startup of the station the compilation may take a couple of minutes.'
  )

  delayedInfo(60, 'Try to run in circles to shorten time.')
})

bundler.on('buildEnd', () => {
  isBuilding = false
  better.info('Build Completed')
})

bundler.on('buildError', error => {
  better.error(error.message)
})

export default bundler
