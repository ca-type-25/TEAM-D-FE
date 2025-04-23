import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { API_URL } from "../../utils/config"
import { Destination } from "../../types/TypesExport"

const ActivityCreatePage: React.FC = () => {
  const navigate = useNavigate()


  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    destinationId: "", 
  })


  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loadingDestinations, setLoadingDestinations] = useState(true)
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get(`${API_URL}/destinations`)
        setDestinations(response.data)
      } catch (err) {
        setError("An error occurred while fetching destinations.")
        console.error(err)
      } finally {
        setLoadingDestinations(false)
      }
    }

    fetchDestinations()
  }, [])


  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target

    const newValue = name === "price" ? Number(value) : value

    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {

      await axios.post(`${API_URL}/activities`, {
        ...formData,
        destinationIds: [formData.destinationId], 
      })
      navigate("/activities")
    } catch (error) {
      console.error("Error creating activity:", error)
    }
  }

  return (
    <div>
      <h1>Create Activity</h1>

      {error && <div style={{ color: "red" }}>Error: {error}</div>}

      {loadingDestinations ? (
        <div>Loading destinations...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="formControl">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formControl">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formControl">
            <label htmlFor="description">Description:</label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>


          <div className="formControl">
            <label htmlFor="destinationId">Destination:</label>
            <select
              name="destinationId"
              id="destinationId"
              value={formData.destinationId}
              onChange={handleChange}
              required
            >
              <option value="">-- Select a Destination --</option>
              {destinations.map((destination) => (
                <option key={destination._id} value={destination._id}>
                  {destination.name} ({destination.country})
                </option>
              ))}
            </select>
          </div>

          <button type="submit">Create</button>
          <button type="button" onClick={() => navigate("/activities")}>
            Cancel
          </button>
        </form>
      )}
    </div>
  )
}

export default ActivityCreatePage