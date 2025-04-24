import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Activity, Trip } from "../../types/TypesExport"
import { API_URL } from "../../utils/config"

const TripsItem: React.FC = () => {
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

    if (!trip) {
        return <p>Loading...</p>
    }
console.log(activities)
    return (
        <div>
            <h1>{name} ({category?.name})</h1>
            <Link to={`/edit-trip/${id}`} >Edit</Link>

            <p>Description: {description}</p>
            <p>Price: {price} EUR.</p>

            {destination && destination.length > 0 ? (
                <div>
                    <h3>{destination.length > 1 ? 'Destinations:' : 'Destination:'}</h3>

                    <ul>
                        {destination.map((item, index) => (
                            <li key={index}>
                               <Link to={`/destinations/${item._id}`} >{item.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No destinations added</p>
            )}

            {activities && activities.length > 0 ? (
                <div>
                    <h3>{activities.length > 1 ? 'Activities:' : 'Activity:'}</h3>

                    <ul>
                        {activities.map((item, index) => (
                            <li key={index}>
                               <Link to={`/activities/${item._id}`} >{item.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No activities added</p>
            )}
        </div>
    )
}
export default TripsItem