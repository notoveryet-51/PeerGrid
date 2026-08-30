import { useContext, useState } from 'react'
import { AuthContext } from '../state/AuthContext'
import { loginUser, signupUser } from '../api/auth.api'

export function useAuth() {
  const context = useContext(AuthContext)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  const handleLogin = async (email, password) => {
    try {
      setLoading(true)
      setError(null)
      const data = await loginUser({ email, password })
      context.login(data.user, data.token)
      return { success: true }
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed'
      setError(msg)
      return { success: false, error: msg }
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (name, email, password) => {
    try {
      setLoading(true)
      setError(null)
      const data = await signupUser({ name, email, password })
      context.login(data.user, data.token)
      return { success: true }
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed'
      setError(msg)
      return { success: false, error: msg }
    } finally {
      setLoading(false)
    }
  }

  return {
    ...context,
    loginWithCredentials: handleLogin,
    registerWithCredentials: handleRegister,
    authLoading: loading,
    authError: error,
  }
}