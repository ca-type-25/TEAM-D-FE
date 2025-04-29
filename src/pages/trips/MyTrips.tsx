import { useEffect, useState } from "react"
import { API_URL } from "../../utils/config"
import { Link } from "react-router-dom"

import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Paper,
    Button,
} from "@mui/material"

const MyTrips: React.FC = () => {
    const [myTrips, setMyTrips] = useState([])
    const token = localStorage.getItem("token")

    useEffect(() => {
        if (!token) return

        const fetchMyTrips = async () => {
            const res = await fetch(`${API_URL}/trips/my-trips`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            const data = await res.json()
            setMyTrips(data)
        }
        fetchMyTrips()
    }, [token])

    if (!token) {
        return (
            <Box sx={{ padding: 4 }}>
                <Typography variant="h6" color="error">
                    You have to be logged in to see your personal trips.
                </Typography>
            </Box>
        )
    }

    return (
        <Box sx={{ padding: 4 }}>
            {myTrips && myTrips.length > 0 ? (
                <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        {myTrips.length > 1 ? "My Trips:" : "My Trip:"}
                    </Typography>
                    <List>
                        {myTrips.map((trip) => (
                            <ListItem
                                key={trip._id}
                                component={Link}
                                to={`/trips/${trip._id}`}
                                button
                            >
                                <ListItemText primary={trip.name} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            ) : (
                <Typography variant="h5">No trips yet...</Typography>
            )}

            <Button
                component={Link}
                to="/create-trip"
                variant="contained"
                color="primary"
            >
                Create Trip
            </Button>
        </Box>
    )
}

export default MyTrips
