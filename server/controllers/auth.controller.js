const User = require('../models/User.model')
const jwt = require('jsonwebtoken')

const generateToken = (userId) => {
  // Added fallback for JWT_SECRET and converted userId to string to prevent signing errors
  const secret = process.env.JWT_SECRET || 'fallback_secret_key_123'
  return jwt.sign({ id: userId.toString() }, secret, { expiresIn: '7d' })
}

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const existingUser = await User.findOne({ email: normalizedEmail })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const user = await User.create({
      name,
      email: normalizedEmail,
      password,
    })

    const token = generateToken(user._id)

    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    // Added console log to print the exact error to the terminal
    console.error('Registration Error:', error)
    return res.status(500).json({ message: 'Server error', error: error.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Added input validation to prevent .trim() from crashing if email is undefined
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const user = await User.findOne({ email: normalizedEmail })
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = generateToken(user._id)

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    // Added console log to print the exact error to the terminal
    console.error('Login Error:', error)
    return res.status(500).json({ message: 'Server error', error: error.message })
  }
}

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.status(200).json(user)
  } catch (error) {
    // Added console log to print the exact error to the terminal
    console.error('GetMe Error:', error)
    return res.status(500).json({ message: 'Server error', error: error.message })
  }
}