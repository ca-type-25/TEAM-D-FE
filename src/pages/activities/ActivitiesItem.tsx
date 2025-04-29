import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { Activity } from "../../types/TypesExport";
import { API_URL } from "../../utils/config";
import API from "../../utils/api";

import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Alert,
} from "@mui/material";

const darkGreen = "#2E7D32";

const ActivityPage: React.FC = () => {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await API.get<Activity>(`${API_URL}/activities/${id}`);
        setActivity(response.data);
      } catch (err) {
        setError("An error occurred while fetching the activity.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this activity?")) return;

    try {
      await API.delete(`${API_URL}/activities/${id}`);
      navigate("/activities");
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!activity) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="info">No activity found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" color={darkGreen}>
        {activity.name}
      </Typography>

      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Price:
            </Typography>
            <Typography variant="body1">{activity.price} EUR</Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Description:
            </Typography>
            <Typography variant="body1">{activity.description || "Not provided"}</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Destination:
            </Typography>
            {activity.destinationIds && activity.destinationIds.length > 0 ? (
              <Typography variant="body1">
                <Link
                  to={`/destinations/${activity.destinationIds[0]._id}`}
                  style={{ color: darkGreen, textDecoration: "none" }}
                >
                  {activity.destinationIds[0].name}, {activity.destinationIds[0].country}
                </Link>
              </Typography>
            ) : (
              <Typography variant="body1" color="text.secondary">
                Not available
              </Typography>
            )}
          </Box>
        </CardContent>

        <CardActions
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            gap: 2,
            px: 2,
            pb: 2,
          }}
        >
          <Button
            component={Link}
            to={`/edit-activity/${id}`}
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
            Edit
          </Button>
          <Button
            onClick={handleDelete}
            variant="outlined"
            color="error"
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default ActivityPage;