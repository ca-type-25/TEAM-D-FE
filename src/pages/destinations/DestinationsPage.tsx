import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDestinations } from "../../utils/api";

import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Link as MuiLink,
  CircularProgress,
  Grid,
} from "@mui/material";

interface Destination {
  _id: string;
  name: string;
  country: string;
  geolocation: {
    longitude: number;
    latitude: number;
  };
  description: string;
}

const DestinationsPage: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const limit = 1000;
  const page = 1;
  const sort = "country";

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await getDestinations(page, limit, sort);
        setDestinations(response.data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom align="center">
        All Destinations
      </Typography>

      <Box mb={3} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/create-destination"
        >
          ➕ Add New Destination
        </Button>
      </Box>

      {/* Cards */}
      <Grid container spacing={2} justifyContent="center">
        {destinations.map((d) => (
          <Grid item key={d._id} xs={6} sm={4} md={3} lg={2}>
            <Card
              sx={{
                height: 180,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                textAlign: "center",
                padding: 1,
              }}
            >
              <CardContent>
                <MuiLink
                  component={Link}
                  to={`/destinations/${d._id}`}
                  underline="hover"
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color="primary"
                  >
                    {d.name}
                  </Typography>
                </MuiLink>

                <Typography variant="body2" color="textSecondary">
                  {d.country || "Unknown country"}
                </Typography>

                <Typography variant="body2" mt={1}>
                  {d.description.length > 50
                    ? d.description.slice(0, 50) + "..."
                    : d.description}
                </Typography>
              </CardContent>

              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={() => navigate(`/edit-destination?id=${d._id}`)}
              >
                Edit
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DestinationsPage;
