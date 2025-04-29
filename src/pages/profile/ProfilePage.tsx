import { useEffect, useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import {
  Container,
  Typography,
  Button,
  TextField,
  Box,
  Paper
} from '@mui/material'
import { User } from '../../types/TypesExport'

const ProfilePage = () => {
  const [form, setForm] = useState<User>({
    name: '', surname: '', age: 0, nationality: '', email: ''
  })
  const [editMode, setEditMode] = useState(false)
  const [notLoggedIn, setNotLoggedIn] = useState(false)
  const navigate = useNavigate()

  const userId = localStorage.getItem('userId')
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!userId) {
      setNotLoggedIn(true)
      return
    }

    const fetchUser = async () => {
      const res = await fetch(`http://localhost:3000/api/users/${userId}`)
      const data = await res.json()
      delete data._id
      setForm(data)
    }

    fetchUser()
  }, [userId])

  if (notLoggedIn) {
    return (
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 6, textAlign: 'center' }}>
          <Typography variant="h5" color="error">⚠️ Need to login</Typography>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => navigate('/login')}
          >
            Go to Login
          </Button>
        </Paper>
      </Container>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    })
    if (res.ok) {
      alert('Profile updated')
      setEditMode(false)
    } else alert('Failed to update')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    navigate('/login')
  }

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete your account?')
    if (!confirm) return

    const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (res.ok) {
      alert('Account deleted')
      localStorage.clear()
      navigate('/register')
    } else {
      alert('Failed to delete account')
    }
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
        <Typography variant="h4" gutterBottom>User Settings</Typography>

        {!editMode ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography><strong>Name:</strong> {form.name}</Typography>
            <Typography><strong>Surname:</strong> {form.surname}</Typography>
            <Typography><strong>Age:</strong> {form.age}</Typography>
            <Typography><strong>Nationality:</strong> {form.nationality}</Typography>
            <Typography><strong>Email:</strong> {form.email}</Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={() => setEditMode(true)}
              sx={{ mt: 2 }}
            >
              Edit Info
            </Button>
          </Box>
        ) : (
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}
          >
            {Object.entries(form).map(([key, val]) => (
              <TextField
                key={key}
                type="text"
                name={key}
                value={val}
                onChange={handleChange}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                fullWidth
              />
            ))}
            <Button type="submit" variant="contained" color="success">
              Update
            </Button>
          </Box>
        )}

        <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
          <Button onClick={handleLogout} variant="contained" color="secondary" fullWidth>
            Log out
          </Button>
          <Button onClick={handleDelete} variant="contained" color="error" fullWidth>
            Delete Account
          </Button>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Button
            component={RouterLink}
            to="/my-trips"
            variant="outlined"
            fullWidth
          >
            My Trips
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default ProfilePage
