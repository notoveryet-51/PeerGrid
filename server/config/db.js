const mongoose = require('mongoose')

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI

  if (!mongoUri) {
    console.warn('MONGO_URI is not set. MongoDB connection skipped.')
    return false
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    })

    console.log(`MongoDB connected: ${mongoose.connection.host}`)
    return true
  } catch (error) {
    console.error('MongoDB connection error:', error.message)
    return false
  }
}

module.exports = connectDB
