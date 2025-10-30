import React, { useState } from 'react'

type Props = { onLogin: () => void }

export default function Login({ onLogin }: Props) {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Login failed')
      }

      localStorage.setItem('token', data.token)
      onLogin()
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <h1 className="title">Admin Login</h1>
      {error && <div className="alert">{error}</div>}
      <form className="formGrid" onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" value={credentials.email} onChange={handleChange} autoComplete="email" required />
        <input name="password" type="password" placeholder="Password" value={credentials.password} onChange={handleChange} autoComplete="current-password" required />
        <button className="btn btnPrimary" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}
