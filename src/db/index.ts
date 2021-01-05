import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

// The db.json file gets created at the projects root directory
const adapter = new FileSync('db.json')
const db = low(adapter)

// Create database
db.defaults({}).write()

export default db
