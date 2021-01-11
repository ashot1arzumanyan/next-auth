// import { useRouter } from 'next/router'

// import useUser from '@/hooks/useUser'
import { checkAuthAndGetUser } from '@/middleware/auth'
import runMongoose from '@/middleware/db'

export default function Profile() {
  // const { user, error } = useUser()
  // const router = useRouter()

  // if (!user) {
  //   return router.push('/login')
  // }

  return (
    <div>
      Profile
    </div>
  )
}

export async function getServerSideProps({ req }) {
  const { tok } = req.cookies
  const isDev = process.env.NODE_ENV !== 'production'
  try {
    await runMongoose()
    const { user } = await checkAuthAndGetUser(tok)
    return {
      props: { user: isDev ? JSON.parse(JSON.stringify(user)) : user }
    }
  } catch (err) {
    console.log(err) // eslint-disable-line no-console
    return {
      redirect: {
        destination: '/login'
      }
    }
  }
}
