import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './App.css'
import Login from './Login'

const container = document.getElementById('root')!
const root = createRoot(container)

function Root() {
  const [authed, setAuthed] = React.useState<boolean>(() => !!localStorage.getItem('token'))
  return authed ? <App /> : <Login onLogin={() => setAuthed(true)} />
}

root.render(<Root />)


