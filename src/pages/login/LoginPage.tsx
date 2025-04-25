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
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl mb-4">Login</h1>
      <LoginForm />
      <div className="mt-4">
        <RegisterLink />
      </div>
      <div className="mt-6">
        <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">
          Log out
        </button>
      </div>
    </div>
  )
}


export default LoginPage