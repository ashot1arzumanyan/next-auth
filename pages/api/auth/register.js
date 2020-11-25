export default (req, res, next) => {
  console.log(req.url)
  res.end('okey')
}