const jwt = require('jsonwebtoken')
const User = require('../models/User.model')

const protect = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' })
  }

  try {
    // Added identical fallback secret to prevent verification crashes
    const secret = process.env.JWT_SECRET || 'fallback_secret_key_123'
    const decoded = jwt.verify(token, secret)
    req.user = await User.findById(decoded.id).select('-password')

    if (!req.user) {
      return res.status(401).json({ message: 'User not found' })
    }

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token failed' })
  }
}

module.exports = protect