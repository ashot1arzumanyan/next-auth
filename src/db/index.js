import mongoose from 'mongoose'

const runMongoose = async () => {
  if (mongoose.connection.readyState === 0) {
    const url = process.env.DB_URL
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
    await mongoose.connect(url, options)
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'DB connection error:')) // eslint-disable-line no-console
    db.on('open', () => console.log('DB connected!')) // eslint-disable-line no-console
  }
}

export default runMongoose
