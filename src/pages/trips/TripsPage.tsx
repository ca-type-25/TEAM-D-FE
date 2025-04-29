import { useEffect, useState } from "react"
import { Trip } from "../../types/TypesExport"
import { API_URL } from "../../utils/config"
import { Link } from "react-router-dom"

import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Button,
    Paper,
} from "@mui/material"
import { useAuth } from "../../AuthContext"

const TripsPage: React.FC = () => {
    const [trips, setTrips] = useState<Trip[]>([])
    const { user } = useAuth()

    useEffect(() => {
        const fetchTrips = async () => {
            const res = await fetch(`${API_URL}/trips`)
            const data = await res.json()
            setTrips(data)
        }
        fetchTrips()
    }, [])

    return (
        <Box sx={{ padding: 4 }}>
            {trips && trips.length > 0 ? (
                <Paper elevation={3} sx={{ padding: 3 }}>
                    <Typography variant="h4" gutterBottom>
                        {trips.length > 1 ? "Trips:" : "Trip:"}
                    </Typography>
                    <List>
                        {trips.map((trip) => (
                            <ListItem
                                key={trip._id}
                                component={Link}
                                to={`/trips/${trip._id}`}
                            >
                                <ListItemText
                                    primary={trip.name}
                                    secondary={`User: ${trip.user.name} ${trip.user.surname}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            ) : (
                <Typography variant="h5">No trips yet...</Typography>
            )}

        {user && (
            <Box sx={{ marginTop: 4 }}>
                <Button
                    component={Link}
                    to="/create-trip"
                    variant="contained"
                    color="primary"
                >
                    Create trip!
                </Button>
            </Box>
        )}
        </Box>
    )
}

export default TripsPage
