import { ValidationError } from 'yup'
import crError from 'http-errors'

export const handleError = (err, req, res) => {
  console.log(err)
  if (req.url.includes('api/auth/login')) {
    return res.status(err.status || 400).json({error: {message: 'Something went wrong'}, temp: err}) //tmp
  }
  if (req.url.includes('api/auth/resetPassword/email')) {
    res.json({})
  }
  if (err instanceof ValidationError) {
    const { path, message, type } = err
    return res.status(400).json({error: { path, message, type }})
  }
  if (err.expose) {
    res.status(err.status).json({error: {message: err.message}})
  } else {
    res.status(err.status || 500).json({error: {message: 'Something went wrong'}, temp: err}) //tmp
  }
}

export default (handler, allowMethods = []) => async (req, res) => {
  try {
    if (!allowMethods.includes(req.method)) {
      throw crError.NotFound()
    }
    await handler(req, res)
  } catch (err) {
    return handleError(err, req, res)  
  }
}