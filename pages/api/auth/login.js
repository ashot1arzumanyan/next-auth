import crError from 'http-errors'
import Cookies from 'cookies'
import bcrypt from 'bcryptjs'
import withErrorHandler from '@/middleware/errorHandler'
import { loginSchema } from '@/utils/validator/schemas'
import runMongoose from '@/middleware/db'
import User from '@/db/models/user'
import Session from '@/db/models/session'
import { jwtSign, getRandomKey } from '@/utils/cryptos'

const handler = async (req, res) => {
  await runMongoose()
  await loginSchema.validate(req.body)
  const { username, password } = req.body
  const query = { $or: [{ username }, { email: username }] }
  const user = await User.findOne(query).select({ password: 1 }).lean()
  if (!user) {
    throw crError.BadRequest('User not found')
  }
  const isAuth = await bcrypt.compare(password, user.password)
  if (!isAuth) {
    throw crError.BadRequest('Wrong password')
  }
  const salt = await getRandomKey()
  const session = await Session.findOneAndUpdate(
    { user: user._id },
    { salt, date: Date.now() },
    { upsert: true, new: true }
  )
  const payload = { id: session._id }
  const expiresIn = 60 * 60 * 1000 * 24 * 5
  const tok = await jwtSign(payload, salt, { expiresIn })
  const cookies = new Cookies(req, res)
  await cookies.set('tok', tok, { httpOnly: true, path: '/', sameSite: true, maxAge: expiresIn })
  delete user.password
  res.json({ data: user })
}

export default withErrorHandler(handler, ['POST'])
