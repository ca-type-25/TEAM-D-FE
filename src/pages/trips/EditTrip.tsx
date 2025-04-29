import { useParams } from "react-router-dom"
import TripsForm from "../../components/forms/TripForm"
import { useEffect, useState } from "react"
import { Trip } from "../../types/TypesExport"
import { API_URL } from "../../utils/config"
import { Box, Typography } from "@mui/material"

const EditTrip: React.FC = () => {
    const { id } = useParams()
    const [trip, setTrip] = useState<Trip>()

    useEffect(() => {
        const fetchTrip = async () => {
            const res = await fetch(`${API_URL}/trips/${id}`)
            const data = await res.json()
            setTrip(data.trip)
        }
        fetchTrip()
    }, [id])

    if (!trip) {
        return <Typography>Loading...</Typography>
    }

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Edit Trip
            </Typography>
            <TripsForm editTripData={trip} />
        </Box>
    )
}
export default EditTrip
