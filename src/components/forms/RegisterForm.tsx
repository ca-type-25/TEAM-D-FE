import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, TextField } from '@mui/material'


const RegisterForm = () => {
  const [form, setForm] = useState({
    name: '', surname: '', age: '', nationality: '', email: '', password: ''
  })
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (res.ok) {
        navigate('/login')
      } else {
        alert('Registration failed')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {Object.entries(form).map(([key, val]) => (
        <TextField
          key={key}
          type={key === 'password' ? 'password' : key === 'age' ? 'number' : 'text'}
          name={key}
          value={val}
          onChange={handleChange}
          label={key.charAt(0).toUpperCase() + key.slice(1)}
          required
          fullWidth
        />
      ))}
      <Button type="submit" variant="contained" color="primary">
        Register
      </Button>
    </Box>
  )
}

export default RegisterForm