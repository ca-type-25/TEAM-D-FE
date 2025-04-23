import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { API_URL } from "../../utils/config"
import { Destination } from "../../types/TypesExport"

const ActivityEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    destinationId: "", 
  })

  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {

        const activityResponse = await axios.get(`${API_URL}/activities/${id}`)
        const activityData = activityResponse.data


        setFormData({
          ...activityData,
          destinationId: activityData.destinationIds?.[0]?._id || "", 
        })


        const destinationsResponse = await axios.get(`${API_URL}/destinations`)
        setDestinations(destinationsResponse.data)
      } catch (err) {
        setError("An error occurred while fetching data.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])


  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target


    const newValue = name === "price" ? Number(value) : value

    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }))
  }


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {

      await axios.put(`${API_URL}/activities/${id}`, {
        ...formData,
        destinationIds: [formData.destinationId],
      })
      navigate("/activities")
    } catch (error) {
      console.error("Error updating activity:", error)
    }
  }

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h1>Edit Activity</h1>

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

        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate("/activities")}>
          Cancel
        </button>
      </form>
    </div>
  )
}

export default ActivityEditPage