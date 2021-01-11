import Cookies from 'cookies'
import { nanoid } from 'nanoid'
import { createTokAndSalt, verify } from '@/utils/cryptos'

const KEYLEN = 16

export const setCsrf = (keylen => async (req, res) => {
  let { a } = req.cookies
  if (!a) {
    a = await nanoid()
  }
  const { salt, tok } = await createTokAndSalt(a, keylen)
  const cookies = new Cookies(req, res)
  cookies.set('a', a, { httpOnly: true, path: '/', sameSite: true, maxAge: 60 * 60 * 24 * 1000 * 365 })
  cookies.set('csrf', tok, { httpOnly: true, path: '/', sameSite: true, maxAge: 60 * 60 * 24 * 1000 * 1 })
  return { salt, csrf: tok, a }
})(KEYLEN)

export const verifyCsrf = (keylen => (a, salt, csrf) => verify(a, salt, csrf, keylen))(KEYLEN)
