import jwt from 'jsonwebtoken'

export default function auth(req, res, next) {
  const header = req.headers.authorization || ''
  const [, token] = header.split(' ')
  if (!token) return res.status(401).json({ error: 'Missing token' })
  const secret = process.env.JWT_SECRET
  if (!secret) return res.status(500).json({ error: 'Auth not configured' })
  try {
    const payload = jwt.verify(token, secret)
    req.user = payload
    return next()
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}


