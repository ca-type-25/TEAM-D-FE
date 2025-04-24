import { useEffect, useState } from "react"
import { Trip } from "../../types/TypesExport"
import { API_URL } from "../../utils/config"
import { Link } from "react-router-dom"

const TripsPage: React.FC = () => {

    const [trips, setTrips] = useState<Trip[]>([])

    useEffect(() => {
        const fetchTrips = async () => {
            const res = await fetch(`${API_URL}/trips`)
            const data = await res.json()
            setTrips(data)
        }
        fetchTrips()
    }, [])
    
    

    return (
        <div>
            {trips && trips.length > 0 ? (
                <div>
                    <h1>{trips.length > 1 ? 'Trips:' : 'Trip:'}</h1>
                    <ul>
                        {trips.map((trip, index) => (
                            <li key={index}>
                                <Link to={`/trips/${trip._id}`}>{trip.name} (user: {trip.user.name} {trip.user.surname})</Link> 
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <h1>No trips yet...</h1>
            )}

            <Link to={'/create-trip'}>Create trip!</Link>
        </div>
    )
}
export default TripsPage