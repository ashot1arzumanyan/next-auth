import runMongoose from '@/db'

export const withDB = handler => async (req, res) => {
  await runMongoose()
  return handler(req, res)
}

export default runMongoose
