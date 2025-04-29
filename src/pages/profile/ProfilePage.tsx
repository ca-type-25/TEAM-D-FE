import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User } from '../../types/TypesExport'
import { useAuth } from '../../AuthContext'

const ProfilePage = () => {
  const [form, setForm] = useState<User>({
    name: '', surname: '', age: 0, nationality: '', email: ''
  })
  const [editMode, setEditMode] = useState(false)
  const navigate = useNavigate()
  const { logoutUser } = useAuth()

  const userId = localStorage.getItem('userId')
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`http://localhost:3000/api/users/${userId}`)
      const data = await res.json()

      delete data._id
      setForm(data)
    }

    if (userId) fetchUser()
  }, [userId])

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
    logoutUser()
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
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl mb-4">User Settings</h1>

      {!editMode ? (
        <div className="flex flex-col gap-2">
          <p><strong>Name:</strong> {form.name}</p>
          <p><strong>Surname:</strong> {form.surname}</p>
          <p><strong>Age:</strong> {form.age}</p>
          <p><strong>Nationality:</strong> {form.nationality}</p>
          <p><strong>Email:</strong> {form.email}</p>

          <button onClick={() => setEditMode(true)} className="mt-4 bg-blue-500 text-white p-2 rounded">
            Edit Info
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {Object.entries(form).map(([key, val]) => (
            <input
              key={key}
              type="text"
              name={key}
              value={val}
              onChange={handleChange}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              className="border p-2 rounded"
            />
          ))}
          <button type="submit" className="bg-green-500 text-white p-2 rounded">Update</button>
        </form>
      )}

      <div className="flex gap-4 mt-6">
        <button onClick={handleLogout} className="bg-gray-500 text-white p-2 rounded">Log out</button>
        <button onClick={handleDelete} className="bg-red-600 text-white p-2 rounded">Delete Account</button>
      </div>
      <div>
        <Link to={'/my-trips'} >My trips</Link>
      </div>
    </div>
  )
}

export default ProfilePage
