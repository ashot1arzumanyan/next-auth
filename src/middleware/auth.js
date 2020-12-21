import { jwtDecode, jwtVerify } from '@/utils/cryptos'
import User from '@/models/user'
import Session from '@/models/session'

export const checkAuthAndGetUser = async (tok) => {
  if (typeof tok !== 'string') {
    throw 'Tok is not a string, tok is: ' + tok
  }
  const decoded = await jwtDecode(tok)
  const session = await Session.findById(decoded.id)
  if (!session) {
    throw new Error('Session not found by id: ' + decoded)
  }
  const user = await User.findById(session.user)
  if (!user) {
    throw new Error('User not found by id: ' + session.user)
  }
  await jwtVerify(tok, session.salt)
  return { user, session }
}