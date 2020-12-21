import withErrorHandler from '@/middleware/errorHandler'
import User from '@/models/user'
import Session from '@/models/session'
import runMongoose from '@/utils/db'
import { checkAuthAndGetUser } from '@/middleware/auth'
import bcrypt from 'bcryptjs'
import { resetPasswordSchema } from '@/validator/schemas'

const handler = async (req, res) => {
  await runMongoose()
  await resetPasswordSchema.validate(req.body)
  const { password, tok } = req.body
  const { user, session } = await checkAuthAndGetUser(tok)
  if (!session.canResetPassword) {
    throw Error('Can not reset password')
  }
  const passwordSalt = await bcrypt.genSalt(16)
  const hash = await bcrypt.hash(password, passwordSalt)
  await User.findByIdAndUpdate(user._id, { password: hash })
  await Session.findByIdAndDelete(session._id)
  res.json({})
}

export default withErrorHandler(handler, ['POST'])