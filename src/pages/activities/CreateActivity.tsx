import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../utils/config";
import { Destination } from "../../types/TypesExport";


import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextareaAutosize,
  CircularProgress,
  Alert,
  SelectChangeEvent,
} from "@mui/material";

const darkGreen = "#2E7D32";

const ActivityCreatePage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    destinationId: "",
  });

  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loadingDestinations, setLoadingDestinations] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get(`${API_URL}/destinations`);
        setDestinations(response.data);
      } catch (err) {
        setError("An error occurred while fetching destinations.");
        console.error(err);
      } finally {
        setLoadingDestinations(false);
      }
    };

    fetchDestinations();
  }, []);

  const handleChange = (
    event: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const newValue = name === "price" ? Number(value) : value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null); 

    try {
      await axios.post(`${API_URL}/activities`, {
        name: formData.name,
        price: formData.price,
        description: formData.description,
        destinationIds: [formData.destinationId],
      });

      navigate("/activities");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error creating activity.";

      setError(errorMessage);
      console.error("Create activity error:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>

      <Typography variant="h4" gutterBottom fontWeight="bold" color={darkGreen}>
        Create Activity
      </Typography>


      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}


      {loadingDestinations ? (
        <Box display="flex" justifyContent="center" my={5}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
  
          <TextField
            label="Activity Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            variant="outlined"
            fullWidth
          />

   
          <TextField
            label="Price (EUR)"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
            variant="outlined"
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel shrink htmlFor="description" sx={{ bgcolor: "white", px: 1 }}>
              Description
            </InputLabel>
            <TextareaAutosize
              id="description"
              name="description"
              minRows={4}
              value={formData.description}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "1rem",
                borderRadius: "4px",
                border: "1px solid rgba(0, 0, 0, 0.23)",
              }}
            />
          </FormControl>

        
          <FormControl fullWidth required>
            <InputLabel id="destination-label">Destination</InputLabel>
            <Select
              labelId="destination-label"
              name="destinationId"
              value={formData.destinationId}
              onChange={handleChange}
              label="Destination"
              required
            >
              <MenuItem value="">
                <em>-- Select a Destination --</em>
              </MenuItem>
              {destinations.map((destination) => (
                <MenuItem key={destination._id} value={destination._id}>
                  {destination.name} ({destination.country})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

    
          <Box display="flex" gap={2} mt={2}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: darkGreen,
                color: "white",
                fontWeight: "bold",
                "&:hover": { bgcolor: "#1B5E20" },
              }}
              fullWidth
            >
              Create
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={() => navigate("/activities")}
              fullWidth
            >
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default ActivityCreatePage;