import { jwtSign } from '@/utils/cryptos'
import Cookies from 'cookies'
import runMongoose from '@/middleware/db'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { checkAuthAndGetUser } from '@/middleware/auth'

export default function Verify() {
  const router = useRouter()

  useEffect(() => {
    router.push('/profile')
  }, [router])

  return (
    <div>Loading...</div>
  )
}

export async function getServerSideProps({ req, res, query }) {
  const tok = query.w
  const expiresIn = 60 * 60 * 1000 * 24 * 5
  try {
    await runMongoose()
    const { user, session } = await checkAuthAndGetUser(tok)
    user.temp = null
    await user.save()
    const payload = { id: user._id }
    const newTok = await jwtSign(payload, session.salt, { expiresIn })
    session.date = Date.now()
    await session.save()
    const cookies = await new Cookies(req, res)
    await cookies.set('tok', newTok, { httpOnly: true, path: '/', sameSite: true, maxAge: expiresIn })
  } catch (err) {
    console.log(err) // eslint-disable-line no-console
    return {
      props: {
        error: {
          message: 'Try again.'
        }
      }
    }
  }
  return {
    props: {}
  }
}
