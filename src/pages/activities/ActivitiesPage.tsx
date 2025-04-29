import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../utils/config";
import { Activity } from "../../types/TypesExport";
import API from "../../utils/api";


import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Stack,
} from "@mui/material";

const darkGreen = "#2E7D32";
const lightBackground = "#f9f9f9";

const ActivitiesPage: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await API.get(`${API_URL}/activities`);
        setActivities(response.data);
      } catch (err) {
        setError("An error occurred while fetching activities.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 5,
        bgcolor: lightBackground,
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          Activities
        </Typography>

        <Button
          component={Link}
          to="/create-activity"
          variant="contained"
          sx={{
            bgcolor: darkGreen,
            color: "white",
            fontWeight: "bold",
            "&:hover": {
              bgcolor: "#1B5E20",
            },
          }}
        >
          Create Activity
        </Button>
      </Box>

      {activities.length === 0 ? (
        <Typography align="center" variant="h6" color="text.secondary">
          No activities found.
        </Typography>
      ) : (
        <Stack spacing={3}>
          {activities.map((activity) => (
            <Card
              key={activity._id}
              sx={{
                boxShadow: 2,
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "scale(1.01)",
                  boxShadow: 4,
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  color={darkGreen}
                >
                  <Link
                    to={`/activities/${activity._id}`}
                    style={{ color: darkGreen, textDecoration: "none" }}
                  >
                    {activity.name}
                  </Link>
                </Typography>

                <Typography variant="body2" paragraph color="text.secondary">
                  {activity.description || "No description provided."}
                </Typography>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mt={1}
                >
                  <Typography variant="body2" fontWeight="500">
                    Price: <strong>{activity.price}</strong> EUR
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Destinations:{" "}
                    <strong>{activity.destinationIds?.length || 0}</strong>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}


      <Box mt={5} textAlign="center">
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Trip planner – All rights reserved
        </Typography>
      </Box>
    </Container>
  );
};

export default ActivitiesPage;