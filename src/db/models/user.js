import mongoose from 'mongoose'

const { Schema } = mongoose

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true, select: false },
  password: { type: String, required: true, select: false },
  createdAt: { type: Date, default: Date.now },
  temp: { type: Date, expires: '1d', default: Date.now, select: false }
})

const User = (mongoose.models && mongoose.models.User) || mongoose.model('User', UserSchema)

export default User
