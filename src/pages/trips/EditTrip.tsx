import { useParams } from "react-router-dom"
import TripsForm from "../../components/forms/TripForm"
import { useEffect, useState } from "react"
import { Trip } from "../../types/TypesExport"
import { API_URL } from "../../utils/config"

const EditTrip: React.FC = () => {

    const { id } = useParams()
    const [trip, setTrip] = useState<Trip>()

    useEffect(() => {
        const fetchTrip = async () => {
            const res = await fetch(`${API_URL}/trips/${id}`)
            const data = await res.json()
            setTrip(data)
        }
        fetchTrip()
    }, [id])

    if (!trip) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h1>Edit</h1>
            <TripsForm editTripData={trip} />
        </div>
    )
}
export default EditTrip