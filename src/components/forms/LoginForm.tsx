import { useState } from 'react'
import { TextField, Button, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.id)
        navigate('/user-profile')
      } else {
        alert(data.message || 'Login failed')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        type="email"
        label="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        fullWidth
      />
      <TextField
        type="password"
        label="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
    </Box>
  )
}

export default LoginForm