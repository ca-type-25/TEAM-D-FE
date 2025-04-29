import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../utils/api";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface Destination {
  _id: string;
  name: string;
  description: string;
  geolocation: {
    latitude: number;
    longitude: number;
  };
  country: string;
}

const DestinationItem: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [flagUrl, setFlagUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const res = await API.get(`/destinations/${id}`);
        const data = res.data;
        setDestination(data);

        if (data.country) {
          const flagRes = await axios.get(
            `https://restcountries.com/v3.1/name/${encodeURIComponent(
              data.country
            )}`
          );
          const flag = flagRes.data[0]?.flags?.png;
          if (flag) setFlagUrl(flag);
        }
      } catch (err) {
        console.error("Error fetching destination or flag:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!destination) return <p>Destination not found</p>;

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Card
        variant="outlined"
        sx={{
          p: 3,
          width: 320,
          borderRadius: 3,
          textAlign: "center",
          boxShadow: 3,
        }}
      >
        <CardContent>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {destination.name}
          </Typography>

          {flagUrl && (
            <Box mb={2}>
              <img
                src={flagUrl}
                alt={`Flag of ${destination.country}`}
                style={{ width: "150px", borderRadius: "4px" }}
              />
            </Box>
          )}

          <Typography>
            <strong>Country:</strong> {destination.country || "Unknown"}
          </Typography>

          <Typography>
            <strong>Description:</strong> {destination.description}
          </Typography>

          <Typography>
            <strong>Coordinates:</strong> {destination.geolocation.latitude},{" "}
            {destination.geolocation.longitude}
          </Typography>

          <Box
            display="flex"
            justifyContent="center"
            gap={1}
            mt={3}
            flexWrap="wrap"
          >
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() =>
                navigate(`/edit-destination?id=${destination._id}`)
              }
            >
              Edit this destination
            </Button>

            <Button
              variant="text"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/destinations")}
            >
              Back
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DestinationItem;
