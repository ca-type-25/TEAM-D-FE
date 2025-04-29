import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { API_URL } from "../../utils/config"
import { Activity } from "../../types/TypesExport"
import API from "../../utils/api"

const ActivitiesPage: React.FC = () => {

  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await API.get(`${API_URL}/activities`)
        setActivities(response.data)
      } catch (err) {
        setError("An error occurred while fetching activities.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])


  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>
  }


  if (error) {
    return <div>Error: {error}</div>
  }


  return (
    <div>
      <h1>Activities Page</h1>

      <div>
        <Link to="/create-activity">
          <button>Create Activity</button>
        </Link>
      </div>

      <ul>
        {activities.map((activity) => (
          <li key={activity._id}>
            <Link to={`/activities/${activity._id}`}>
              <strong>{activity.name}</strong>: {activity.description}
            </Link>
            <div>
              <span>Price: {activity.price} EUR</span>
              <span> Destinations: {activity.destinationIds?.length || 0} </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ActivitiesPage