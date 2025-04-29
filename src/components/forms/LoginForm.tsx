import { useState } from 'react'
import { TextField, Button, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../AuthContext'
import API from '../../utils/api'
import { API_URL } from '../../utils/config'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { loginUser } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const loginInfo = { email, password }
      const res = await API.post(`${API_URL}/users/login`, loginInfo)
      const { token } = res.data

      if (token) {
          loginUser(token)
          navigate('/user-profile')
      }

  } catch (error) {
      console.log('Failed to register', error)
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