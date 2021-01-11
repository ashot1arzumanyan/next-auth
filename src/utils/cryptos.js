import crypto from 'crypto'
import jsonwebtoken from 'jsonwebtoken'
import { promisify } from 'util'
import { Types } from 'mongoose'

export const jwtSign = promisify(jsonwebtoken.sign)
export const jwtVerify = promisify(jsonwebtoken.verify)
export const jwtDecode = async tok => {
  const decoded = await jsonwebtoken.decode(tok)
  if (!Types.ObjectId.isValid(decoded.id)) throw new Error(`invalid ObjectId: ${decoded}`)
  return decoded
}

export const getRandomKey = (min = 16, max = 32) => {
  const num = crypto.randomInt(min, max)
  return new Promise((resolve, reject) => {
    crypto.randomBytes(num, (err, buf) => {
      if (err) return reject(err)
      return resolve(buf.toString('hex'))
    })
  })
}

export const createTokAndSalt = (id, keylen = 44) => new Promise((resolve, reject) => {
  const num = crypto.randomInt(8, 16)
  crypto.randomBytes(num, (err1, buf1) => {
    if (err1) return reject(err1)
    const salt = buf1.toString('hex')
    return crypto.scrypt(id, salt, keylen, (err2, buf2) => {
      if (err2) return reject(err2)
      return resolve({ salt, tok: buf2.toString('hex') })
    })
  })
})

export const createTokWithIdAndSalt = async (id, keylen = 44) => {
  const { salt, tok } = await createTokAndSalt(id, keylen)
  return { idWithTok: `${tok}_${id}`, salt }
}

export const verify = (id, tok, salt, keylen = 44) => new Promise((resolve, reject) => {
  crypto.scrypt(id, salt, keylen, (err, buf) => {
    if (err) return reject(err)
    const isEqual = tok === buf.toString('hex')
    return resolve(isEqual)
  })
})
