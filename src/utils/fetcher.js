export default async (url, options) => {
  const res = await fetch(url, options)
  const { ok, status, headers: { Location } } = res
  try {
    const { data, error } = await res.json()
    return { ok, status, data, error, redirectLocation: Location }
  } catch(err) {
    console.log(err)
    return { ok, status, errors: { message: err.message } }
  }
}