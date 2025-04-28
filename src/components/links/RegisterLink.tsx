import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

const RegisterLink = () => {
  return (
    <Button component={Link} to="/register" variant="outlined">
      Don't have an account? Register
    </Button>
  )
}

export default RegisterLink
