import RegisterForm from '../../components/forms/RegisterForm'
import LogInLink from '../../components/links/LoginLink'

const RegisterPage = () => (
  <div className="max-w-md mx-auto mt-10">
    <h1 className="text-2xl mb-4">Register</h1>
    <RegisterForm />
    <div className="mt-4">
      <LogInLink />
    </div>
  </div>
)

export default RegisterPage
