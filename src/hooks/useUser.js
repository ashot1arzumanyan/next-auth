// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/router'
// import session from '@/apis/session'

// export default () => {
//   const [user, setUser] = useState(null)
//   const router = useRouter()

//   useEffect(async () => {

//     const { data, error } = await session()

//     if (!error) {
//       setUser(data.user)
//     } 

//   }, [])

//   return user
// }