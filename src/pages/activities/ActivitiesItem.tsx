import React, { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import axios from "axios"

import { Activity } from "../../types/TypesExport"
import { API_URL } from "../../utils/config"

const ActivityPage: React.FC = () => {
  const [activity, setActivity] = useState<Activity | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await axios.get<Activity>(`${API_URL}/activities/${id}`)
        setActivity(response.data);
      } catch (err) {
        setError("An error occurred while fetching the activity.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchActivity()
  }, [id])


  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this activity?")) {
      return
    }

    try {
      await axios.delete(`${API_URL}/activities/${id}`)
      navigate("/activities")
    } catch (error) {
      console.error("Error deleting activity:", error)
    }
  }


  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!activity) {
    return <div>No activity found</div>
  }

  return (
    <div>
      <h1>Activity Page</h1>

      <p><strong>Name:</strong> {activity.name}</p>
      <p><strong>Price:</strong> {activity.price} EUR.</p>
      <p><strong>Description:</strong> {activity.description}</p>

      {activity.destinationIds && activity.destinationIds.length > 0 ? (
        <p>
          <strong>Destination:</strong>{" "}
          <Link to={`/destinations/${activity.destinationIds[0]._id}`}>
            {activity.destinationIds[0].name}, {activity.destinationIds[0].country}
          </Link>
        </p>
      ) : (
        <p><strong>Destination:</strong> Not available</p>
      )}

      <div>
        <button onClick={() => navigate(`/edit-activity/${id}`)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default ActivityPage