import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const { loginWithCredentials, registerWithCredentials, authLoading, authError } = useAuth()
  const [isRegistering, setIsRegistering] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isRegistering) {
      await registerWithCredentials(form.name, form.email, form.password)
    } else {
      await loginWithCredentials(form.email, form.password)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4 dark:bg-slate-950">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900"
      >
        <h1 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
          {isRegistering ? 'Create your PeerGrid account' : 'Welcome back'}
        </h1>
        <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
          {isRegistering
            ? 'Connect with peers based on skills and goals.'
            : 'Sign in to access your dashboard and matches.'}
        </p>

        {authError && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/50 dark:text-red-400">
            {authError}
          </div>
        )}

        {isRegistering && (
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Full Name
            </label>
            <input
              required
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-slate-900 outline-none focus:border-blue-600 dark:border-slate-700 dark:text-white"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Email
          </label>
          <input
            required
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-slate-900 outline-none focus:border-blue-600 dark:border-slate-700 dark:text-white"
          />
        </div>

        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Password
          </label>
          <input
            required
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-slate-900 outline-none focus:border-blue-600 dark:border-slate-700 dark:text-white"
          />
        </div>

        <button
          type="submit"
          disabled={authLoading}
          className="w-full rounded-lg bg-blue-600 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {authLoading ? 'Processing...' : isRegistering ? 'Sign up' : 'Sign in'}
        </button>

        <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            {isRegistering ? 'Sign in' : 'Create account'}
          </button>
        </div>
      </form>
    </div>
  )
}