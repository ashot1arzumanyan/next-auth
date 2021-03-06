import { jwtDecode, jwtVerify } from '@/utils/cryptos'
import User from '@/db/models/user'
import Session from '@/db/models/session'

// eslint-disable-next-line import/prefer-default-export
export const checkAuthAndGetUser = async tok => {
  if (typeof tok !== 'string') {
    throw new Error(`Tok is not a string, tok is: ${tok}`)
  }
  const decoded = await jwtDecode(tok)
  const session = await Session.findById(decoded.id)
  if (!session) {
    throw new Error(`Session not found by id: ${decoded}`)
  }
  const user = await User.findById(session.user)
  if (!user) {
    throw new Error(`User not found by id: ${session.user}`)
  }
  await jwtVerify(tok, session.salt)
  return { user, session }
}
