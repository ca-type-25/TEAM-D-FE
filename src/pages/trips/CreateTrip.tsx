import TripsForm from "../../components/forms/TripForm"
import { Box, Typography } from "@mui/material"

const CreateTrip: React.FC = () => {
    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Create a Trip
            </Typography>
            <TripsForm />
        </Box>
    )
}
export default CreateTrip
