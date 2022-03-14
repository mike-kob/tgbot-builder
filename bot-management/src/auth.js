export default (req, res, next) => {
  const secret = req.headers.authorization
  if (secret === `Bearer ${process.env.SECRET}`) {
    next()
  } else {
    res.sendStatus(403)
  }
}
