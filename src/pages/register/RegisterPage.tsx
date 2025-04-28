import RegisterForm from '../../components/forms/RegisterForm'
import LogInLink from '../../components/links/LoginLink'
import { Typography, Box } from '@mui/material'

const RegisterPage = () => (
  <Box
    maxWidth="400px"
    mx="auto"
    mt={10}
    p={4}
    bgcolor="white"
    borderRadius={2}
    boxShadow={3}
  >
    <Typography variant="h4" component="h1" mb={4} textAlign="center">
      Register
    </Typography>

    <RegisterForm />

    <Box mt={4} textAlign="center">
      <LogInLink />
    </Box>
  </Box>
)

export default RegisterPage
