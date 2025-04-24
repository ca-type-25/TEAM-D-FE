import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Activity, Trip } from "../../types/TypesExport"
import { API_URL } from "../../utils/config"
import axios from "axios"

const TripsItem: React.FC = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [trip, setTrip] = useState<Trip | undefined>(undefined)
    const [activities, setActivities] = useState<Activity[]>([])
    const { user, category, destination, name, price, description } = trip || {}

    useEffect(() => {
        const fetchTripData = async () => {
            const res = await fetch(`${API_URL}/trips/${id}`)
            const data = await res.json()
            setTrip(data.trip)
            setActivities(data.activities)
        }
        fetchTripData()
    }, [id])

    const deleteTrip = async (id: string) => {
        try {
            const response = await axios.delete(`${API_URL}/trips/${id}`)
            if (response.status === 200) {
                navigate(`/my-trips`)
            }
        } catch (error) {
            console.error('Error deleting trip:', error)
            alert('There was an error deleting the trip. Please try again.')
        }
    }

    if (!trip) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h1>{name} ({category?.name})</h1>
            <Link to={`/edit-trip/${id}`} >Edit</Link>
            <button onClick={() => deleteTrip(id ?? '')}>Delete</button>

            <p>Description: {description}</p>
            <p>Price: {price} EUR.</p>



            {destination && destination.length > 0 ? (
        <div>
            <h2>{destination.length > 1 ? 'Destinations:' : 'Destination:'}</h2>
            <div>
                {destination.map((dest, index) => (
                    <div key={index}>
                        <h3>
                            <Link to={`/destinations/${dest._id}`}>
                                {dest.name}
                            </Link>
                        </h3>

                        {activities && activities.length > 0 ? (
                            <div>
                                <h6>Activities:</h6>
                                <ul>
                                    {activities.filter((activity) => activity.destinationIds.includes(dest._id))
                                        .map((activity) => (
                                            <li key={activity._id}>
                                                <Link to={`/activities/${activity._id}`}>
                                                    {activity.name}
                                                </Link>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        ) : (
                            <p>No activities for this destination</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    ) : (
        <p>No destinations added</p>
    )}
        </div>
    )
}
export default TripsItem