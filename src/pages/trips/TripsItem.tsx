import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Activity, Trip } from "../../types/TypesExport"
import { API_URL } from "../../utils/config"
import axios from "axios"

import {
    Box,
    Typography,
    Button,
    Paper,
    Divider,
    List,
    ListItem,
    ListItemText,
} from "@mui/material"

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
            console.error("Error deleting trip:", error)
            alert("There was an error deleting the trip. Please try again.")
        }
    }

    if (!trip) {
        return <Typography>Loading...</Typography>
    }

    return (
        <Box sx={{ padding: 4 }}>
            <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
                <Typography variant="h4" gutterBottom>
                    {name}
                </Typography>

                <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
                    <Button
                        component={Link}
                        to={`/edit-trip/${id}`}
                        variant="outlined"
                        color="primary"
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => deleteTrip(id ?? "")}
                    >
                        Delete
                    </Button>
                </Box>

                <Typography>Description: {description}</Typography>
                <Typography sx={{ marginTop: 1 }}>Price: {price} EUR</Typography>
            </Paper>

            {destination && destination.length > 0 ? (
                <Box>
                    <Typography variant="h5" gutterBottom>
                        {destination.length > 1 ? "Destinations:" : "Destination:"}
                    </Typography>

                    {destination.map((dest, index) => (
                        <Paper key={index} sx={{ padding: 2, marginBottom: 3 }}>
                            <Typography variant="h6" component={Link} to={`/destinations/${dest._id}`} sx={{ textDecoration: 'none', color: 'primary.main' }}>
                                {dest.name}
                            </Typography>

                            <Divider sx={{ marginY: 1 }} />

                            {activities && activities.length > 0 ? (
                                <Box>
                                    <Typography variant="subtitle2">Activities:</Typography>
                                    <List dense>
                                        {activities
                                            .filter((activity) =>
                                                activity.destinationIds.includes(dest._id)
                                            )
                                            .map((activity) => (
                                                <ListItem
                                                    key={activity._id}
                                                    component={Link}
                                                    to={`/activities/${activity._id}`}
                                                    button
                                                >
                                                    <ListItemText primary={activity.name} />
                                                </ListItem>
                                            ))}
                                    </List>
                                </Box>
                            ) : (
                                <Typography>No activities for this destination</Typography>
                            )}
                        </Paper>
                    ))}
                </Box>
            ) : (
                <Typography>No destinations added</Typography>
            )}
        </Box>
    )
}

export default TripsItem
