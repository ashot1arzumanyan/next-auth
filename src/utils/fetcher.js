const fetcher = async (url, options) => {
  const res = await fetch(url, options)
  const { ok, status } = res
  try {
    const { data, error } = await res.json()
    return { ok, status, data, error }
  } catch (err) {
    return { ok, status, errors: { message: err.message } }
  }
}

export default fetcher
