import Cookies from 'cookies'
import withErrorHandler from '@/middleware/errorHandler'
import runMongoose from '@/middleware/db'
import Session from '@/db/models/session'
import { jwtDecode } from '@/utils/cryptos'

const handler = async (req, res) => {
  await runMongoose()
  const { tok } = req.cookies
  const cookies = new Cookies(req, res)
  await cookies.set('tok', null, { httpOnly: true, path: '/', sameSite: true, maxAge: 0 })
  const { id } = await jwtDecode(tok)
  await Session.findByIdAndDelete(id)
  res.json({})
}

export default withErrorHandler(handler, ['POST'])
