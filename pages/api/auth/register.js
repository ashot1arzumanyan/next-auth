import { registerSchema } from '@/utils/validator/schemas'
import withErrorHandler from '@/middleware/errorHandler'
import bcrypt from 'bcryptjs'
import runMongoose from '@/middleware/db'
import User from '@/db/models/user'
import Session from '@/db/models/session'
import smtp from '@/utils/mail'
import { getRandomKey, jwtSign } from '@/utils/cryptos'

const handler = async (req, res) => {
  await runMongoose()
  await registerSchema.validate(req.body)
  const { email, password } = req.body
  const passwordSalt = await bcrypt.genSalt(16)
  const hash = await bcrypt.hash(password, passwordSalt)
  const newUser = new User({
    email,
    password: hash,
    createdAt: Date.now()
  })
  const user = await newUser.save()
  const salt = await getRandomKey()
  const session = await Session.findOneAndUpdate(
    { user: user._id },
    { salt, date: Date.now() },
    { upsert: true, new: true }
  )
  const payload = { id: session._id }
  const expiresIn = 60 * 60 * 1000 * 24 * 1
  const tok = await jwtSign(payload, salt, { expiresIn })
  const message = {
    from: 'ashot1arzumanyan@gmail.com',
    to: user.email,
    subject: 'Comfirm email',
    text: 'Please comfirm your email',
    html: `<a href="http://localhost:3000/verify?w=${tok}" >http://localhost:3000/verify?w=${tok}</a>`
  }
  await smtp.send(message)
  res.json({})
}

export default withErrorHandler(handler, ['POST'])
