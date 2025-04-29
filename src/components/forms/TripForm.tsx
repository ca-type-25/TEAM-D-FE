import { useEffect, useState } from "react"
import { API_URL } from "../../utils/config"
import { useNavigate } from "react-router-dom"
import { Trip } from "../../types/TypesExport"
import CATEGORIES from "../../config/categories"

import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material"
import API from "../../utils/api"

type TripFormProps = {
    editTripData?: Trip
}

const TripsForm: React.FC<TripFormProps> = ({ editTripData }) => {
    const navigate = useNavigate()

    const [selectedCategory, setSelectedCategory] = useState<string>("")
    const [destinations, setDestinations] = useState<any[]>([])
    const [selectedDestinations, setSelectedDestinations] = useState<string[]>([])
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [price, setPrice] = useState<number>(0)

    useEffect(() => {
        const fetchDestinations = async () => {
            const res = await fetch(`${API_URL}/destinations`)
            const data = await res.json()
            setDestinations(data)
        }
        fetchDestinations()
    }, [])

    useEffect(() => {
        if (editTripData) {
            setName(editTripData.name)
            setDescription(editTripData.description)
            setPrice(editTripData.price)
            setSelectedCategory(editTripData.category)
            setSelectedDestinations(
                editTripData.destination.map((d) => d._id || d)
            )
        }
    }, [editTripData])
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        const newTrip = {
            name,
            description,
            price,
            category: selectedCategory,
            destination: selectedDestinations,
        }


        if (editTripData) {
            API.put(`${API_URL}/trips/${editTripData._id}`, newTrip)
            navigate(`/trips`)
        } else {
            API.post(`${API_URL}/trips`, newTrip)
            navigate(`/trips`)
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 500 }}>
            <TextField
                label="Trip Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />

            <TextField
                type="number"
                label="Price (€)"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
            />

            <FormControl fullWidth required>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                    labelId="category-label"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    label="Category"
                >
                    {Object.values(CATEGORIES).map((category) => (
                        <MenuItem key={category} value={category}>
                            {category}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Box>
                <Typography variant="subtitle1" gutterBottom>
                    Select Destinations
                </Typography>
                <FormGroup>
                    {destinations.map((destination) => (
                        <FormControlLabel
                            key={destination._id}
                            control={
                                <Checkbox
                                    value={destination._id}
                                    checked={selectedDestinations.includes(destination._id)}
                                    onChange={(e) => {
                                        const { value, checked } = e.target
                                        if (checked) {
                                            setSelectedDestinations((prev) => [...prev, value])
                                        } else {
                                            setSelectedDestinations((prev) =>
                                                prev.filter((d) => d !== value)
                                            )
                                        }
                                    }}
                                />
                            }
                            label={destination.name}
                        />
                    ))}
                </FormGroup>
            </Box>

            <Button variant="contained" type="submit">
                {editTripData ? "Save Changes" : "Create Trip"}
            </Button>
        </Box>
    )
}

export default TripsForm
