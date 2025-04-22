import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {Object.entries(form).map(([key, val]) => (
        <input
          key={key}
          type={key === 'password' ? 'password' : 'text'}
          name={key}
          value={val}
          onChange={handleChange}
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
          required
          className="border p-2 rounded"
        />
      ))}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Register</button>
    </form>
  )
}

export default RegisterForm