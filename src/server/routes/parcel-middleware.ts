import path from 'path'
import Bundler from 'parcel-bundler'

const env = process.env.NODE_ENV || 'development'

// === SETUP PARCEL ===

// defines the website folder
const srcFile = path.join(__dirname, '../web/index.html')

const parcelOptions = {
  sourceMaps: false,
  logLevel: env === 'development' ? 3 : 0,
  https: {
    key: path.join(__dirname, '../ssl/key.pem'),
    cert: path.join(__dirname, '../ssl/server.cert')
  }
}

const bundler = new Bundler(srcFile, parcelOptions)

export default bundler.middleware()
