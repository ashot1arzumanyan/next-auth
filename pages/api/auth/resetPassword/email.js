import withErrorHandler from '@/middleware/errorHandler'
import User from '@/models/user'
import Session from '@/models/session'
import smtp from '@/utils/mail'
import runMongoose from '@/utils/db'
import { getRandomKey, jwtSign } from '@/utils/cryptos'
import { emailSchema } from '@/validator/schemas'

const handler = async (req, res) => {
  await runMongoose()
  await emailSchema.validate(req.body)
  const { email } = req.body
  const findQuery = { email }
  const user = await User.findOne(findQuery)
  if (!user) {
    throw Error('Provided wrong email: ' + email)
  }
  const salt = await getRandomKey()
  const session = await Session.findOneAndUpdate(
    { user: user._id },
    { salt, date: Date.now(), canResetPassword: true },
    { upsert: true, new: true }
  )
  const payload = { id: session._id }
  const expiresIn = 60*60*1000*2
  const tok = await jwtSign(payload, salt, { expiresIn })
  await smtp.send({
    from: 'ashot1arzumanyan@gmail.com',
    to: email,
    subject: 'Comfirm reset password',
    text: 'Please confirm, you want to reset password of "example.com"',
    html: `<a href="http://localhost:3000/resetPassword?w=${tok}" >http://localhost:3000/resetPassword?w=${tok}</a>`
  })
  res.json({})
}

export default withErrorHandler(handler, ['POST'])