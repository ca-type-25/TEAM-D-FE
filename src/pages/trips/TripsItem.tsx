import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Trip } from "../../types/TypesExport"
import { API_URL } from "../../utils/config"

const TripsItem: React.FC = () => {
    const { id } = useParams()
    const [trip, setTrip] = useState<Trip | undefined>(undefined)
    const { user, category, destination, name, price, description } = trip || {}

    useEffect(() => {
        const fetchTripData = async () => {
            const res = await fetch(`${API_URL}/trips/${id}`)
            const data = await res.json()
            setTrip(data)
        }
        fetchTripData()
    }, [id])

    if (!trip) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h1>{name} ({category.name})</h1>
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
        </div>
    )
}
export default TripsItem