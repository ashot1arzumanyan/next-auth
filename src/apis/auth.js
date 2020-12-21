import fetcher from '../utils/fetcher'

export const register = (data) => {
  const url = '/api/auth/register'
  const headers = {
    'Content-Type': 'application/json'
  }
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  }
  return fetcher(url, options)
} 

export const login = (data) => {
  const url = '/api/auth/login'
  const headers = {
    'Content-Type': 'application/json'
  }
  const options = {
    method: 'POST',
    redirect: 'follow',
    headers,
    body: JSON.stringify(data)
  }
  return fetcher(url, options)
} 

export const logout = () => {
  const url = '/api/auth/logout'
  const options = {
    method: 'POST'
  }
  return fetcher(url, options)
} 

export const resetPasswordEmail = (data) => {
  const url = '/api/auth/resetPassword/email'
  const headers = {
    'Content-Type': 'application/json'
  }
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  }
  return fetcher(url, options)
} 

export const resetPassword = (data) => {
  const url = '/api/auth/resetPassword/password'
  const headers = {
    'Content-Type': 'application/json'
  }
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  }
  return fetcher(url, options)
} 