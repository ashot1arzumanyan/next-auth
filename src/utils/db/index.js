import mongoose from 'mongoose'

const url = process.env.DB_URL
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}

let dbInstance = null

const runMongoose = async () => {
  if (!dbInstance) {
    await mongoose.connect(url, options)
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'DB connection error:'))
    db.on('open', () => console.log('DB connected!'))
    dbInstance = db
    return dbInstance
  } else {
    return dbInstance
  }
}

export default runMongoose