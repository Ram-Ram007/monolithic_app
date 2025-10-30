import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv';
dotenv.config();


export const login = async (req, res) => {
  try {
    const { email, password } = req.body || {}
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const adminEmail = process.env.ADMIN_EMAIL
    const adminPass = process.env.ADMIN_PASS
    const secret = process.env.JWT_SECRET

    console.log(adminEmail,adminPass,secret,"✅✅✅✅✅✅✅✅");
    if (!adminEmail || !adminPass || !secret) {
      
      return res.status(500).json({ error: 'Auth not configured' })
    }

    if (email !== adminEmail || password !== adminPass) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign({ role: 'admin', email }, secret, { expiresIn: '2h' })
    return res.json({ token })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}


