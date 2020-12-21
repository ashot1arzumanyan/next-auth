import crypto from 'crypto'
import jsonwebtoken from 'jsonwebtoken'
import { promisify } from 'util'
import { Types } from 'mongoose'

export const jwtSign = promisify(jsonwebtoken.sign)
export const jwtVerify = promisify(jsonwebtoken.verify)
export const jwtDecode = async (tok) => {
  const decoded = await jsonwebtoken.decode(tok)
  if (!Types.ObjectId.isValid(decoded.id)) throw new Error('invalid ObjectId: ' + decoded)
  return decoded
}

export const getRandomKey = (min = 16, max = 32) => {
  const num = crypto.randomInt(min, max)
  return new Promise((resolve, reject) => {
    crypto.randomBytes(num, (err, buf) => {
      if (err) return reject(err)
      resolve(buf.toString('hex'))
    })
  })
}

export const createTokAndSalt = (id, keylen = 44) => {
  return new Promise((resolve, reject) => {
    const num = crypto.randomInt(8, 16)
    crypto.randomBytes(num, (err, buf1) => {
      if (err) return reject(err)
      const salt = buf1.toString('hex')
      crypto.scrypt(id, salt, keylen, (err, buf2) => {
        if (err) return reject(err)
        return resolve({salt, tok: buf2.toString('hex')})
      })
    })
  })
}

export const createTokWithIdAndSalt = async (id, keylen = 44) => {
  const { salt, tok } = await createTokAndSalt(id, keylen)
  return { idWithTok: tok + '_' + id, salt }
}

export const verify = (id, tok, salt, keylen = 44) => {
  return new Promise((resolve, reject) => {
    crypto.scrypt(id, salt, keylen, (err, buf) => {
      if (err) return reject(err)
      const isEqual = tok === buf.toString('hex')
      resolve(isEqual)
    }) 
  })
}