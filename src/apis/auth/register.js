import fetcher from '../fetcher'

export const register = (data) => {
  const url = '/api/auth/register'
  const headers = {
    'Content-Type': 'aplication/json'
  }
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  }
  return fetcher(url, options)
} 