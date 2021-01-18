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
    cert: path.join(__dirname, '../ssl/server.cert')
  }
}

const bundler = new Bundler(srcFile, parcelOptions)

bundler.on('buildStart', () => {
  better.info('Started Build')
})

bundler.on('buildEnd', () => {
  better.info('Build Completed')
})

bundler.on('buildError', error => {
  better.error(error.message)
})

export default bundler
