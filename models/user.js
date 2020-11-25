import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema({

})

const User = mongoose.models['User'] || mongoose.model('User', UserSchema)

export default User