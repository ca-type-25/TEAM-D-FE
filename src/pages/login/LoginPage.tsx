import { Button, Container, Typography, Box } from '@mui/material'
import LoginForm from '../../components/forms/LoginForm'
import RegisterLink from '../../components/links/RegisterLink'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>

      <Box sx={{ mb: 4 }}>
        <LoginForm />
      </Box>

      <Box sx={{ mb: 4 }}>
        <RegisterLink />
      </Box>

      <Button 
        variant="contained" 
        color="error" 
        onClick={handleLogout}
      >
        Log out
      </Button>
    </Container>
  )
}

export default LoginPage