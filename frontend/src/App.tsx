import React, { useEffect, useMemo, useState } from 'react'
import './App.css'

type User = {
  id: number
  name: string
  email: string
}

const initialForm = { name: '', email: '' }

export default function App() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState(initialForm)
  const [editingId, setEditingId] = useState<number | null>(null)

  const apiBase = useMemo(() => '/api/users', [])

  async function fetchUsers() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${apiBase}/getUsers`)
      if (!res.ok) throw new Error('Failed to fetch users')
      const data: User[] = await res.json()
      setUsers(data)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  async function createUser() {
    if (!form.name || !form.email) {
      setError('Name and email are required')
      return
    }
    setError(null)
    const res = await fetch(`${apiBase}/addUsers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      setError(err.error || 'Failed to create user')
      return
    }
    setForm(initialForm)
    fetchUsers()
  }

  function startEdit(u: User) {
    setEditingId(u.id)
    setForm({ name: u.name, email: u.email })
  }

  function cancelEdit() {
    setEditingId(null)
    setForm(initialForm)
  }

  async function updateUser() {
    if (editingId == null) return
    setError(null)
    const payload: Partial<User> = {}
    if (form.name) payload.name = form.name
    if (form.email) payload.email = form.email
    const res = await fetch(`${apiBase}/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      setError(err.error || 'Failed to update user')
      return
    }
    cancelEdit()
    fetchUsers()
  }

  async function deleteUser(id: number) {
    setError(null)
    const res = await fetch(`${apiBase}/${id}`, { method: 'DELETE' })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      setError(err.error || 'Failed to delete user')
      return
    }
    fetchUsers()
  }

  return (
    <div className="container">
      <h1 className="title">Users</h1>

      {error && (
        <div className="alert">{error}</div>
      )}

      <form className="formGrid" onSubmit={(e) => e.preventDefault()}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        />
        {editingId == null ? (
          <button type="button" className="btn btnPrimary" onClick={createUser}>Add</button>
        ) : (
          <div className="actions">
            <button type="button" className="btn" onClick={updateUser}>Save</button>
            <button type="button" className="btn btnWarn" onClick={cancelEdit}>Cancel</button>
          </div>
        )}
      </form>

      <div className="tableWrap">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th className="th">ID</th>
                <th className="th">Name</th>
                <th className="th">Email</th>
                <th className="th">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="rowCell">{u.id}</td>
                  <td className="rowCell">{u.name}</td>
                  <td className="rowCell">{u.email}</td>
                  <td className="rowCell">
                    <button type="button" className="btn" onClick={() => startEdit(u)}>Edit</button>
                    <button type="button" className="btn btnDanger" onClick={() => deleteUser(u.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}


