import mongoose from 'mongoose'
const Schema = mongoose.Schema

const SessionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true, ref: 'User', unique: true },
  salt: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  canResetPassword: { type: Boolean, required: true, default: false }
})

const Session = mongoose.models['Session'] || mongoose.model('Session', SessionSchema)

export default Session