// import { useRouter } from 'next/router'

// import SetUserNameModal from '@/components/SetUserNameModal'
// import useUser from '@/hooks/useUser'
import { checkAuthAndGetUser } from '@/middleware/auth'

export default function Profile ({user}) {
  console.log(user)

  // const { user, error } = useUser()
  // const router = useRouter()

  // if (!user) {
  //   return router.push('/login')
  // }

  return (
    <div>
      Profile
      {/* {user.username && <SetUserNameModal />} */}
    </div>
  )
}

export async function getServerSideProps ({req, res, ...ctx}) {
  const { tok } = req.cookies
  try {
    const { user } = await checkAuthAndGetUser(tok)
    return {
      props: {user: JSON.parse(JSON.stringify(user))} // this is not necessary in prod according to the docs
    }
  } catch (err) {
    console.log(err)
    return {
      redirect: {
        destination: '/login'
      }
    }
  }
}