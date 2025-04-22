import { useEffect, useState } from "react"
import { API_URL } from "../../utils/config"
import { Link } from "react-router-dom"

const MyTrips: React.FC = () => {
    const [myTrips, setMyTrips] = useState([])

useEffect(() => {
    const fetchMyTrips = async () => {
        const res = await fetch(`${API_URL}/trips/my-trips`)
        const data = await res.json()
        setMyTrips(data)
    }
    fetchMyTrips()
}, [])

console.log(myTrips)

    return (
        <div>
            {myTrips && myTrips.length > 0 ? (
                <div>
                    <h1>{myTrips.length > 1 ? 'My trips:' : 'My trip:'}</h1>
                    <ul>
                        {myTrips.map((trip, index) => (
                            <li key={index}>
                                <Link to={`/trips/${trip._id}`}>{trip.name}</Link> 
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <h1>No trips yet...</h1>
            )}

            <Link to={'/create-trip'}>Create trip</Link>

        </div>
    )
}
export default MyTrips