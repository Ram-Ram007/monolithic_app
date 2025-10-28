import React, { useEffect, useMemo, useState } from 'react'

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
    <div style={{ maxWidth: 900, margin: '40px auto', fontFamily: 'system-ui, Arial' }}>
      <h1>Users</h1>

      {error && (
        <div style={{ background: '#fee', color: '#900', padding: 12, marginBottom: 16 }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr auto' }}>
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
          <button onClick={createUser}>Add</button>
        ) : (
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={updateUser}>Save</button>
            <button onClick={cancelEdit}>Cancel</button>
          </div>
        )}
      </div>

      <div style={{ marginTop: 24 }}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>ID</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Name</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Email</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>{u.id}</td>
                  <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>{u.name}</td>
                  <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>{u.email}</td>
                  <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>
                    <button onClick={() => startEdit(u)} style={{ marginRight: 8 }}>Edit</button>
                    <button onClick={() => deleteUser(u.id)}>Delete</button>
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


