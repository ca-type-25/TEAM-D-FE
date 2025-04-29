import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../../utils/api";
import { TextField, MenuItem, Button, Box, Typography } from "@mui/material";

interface Country {
  name: {
    common: string;
  };
}

const inputStyle = {
  width: "160px",
};

const EditDestination: React.FC = () => {
  const [searchParams] = useSearchParams();
  const destinationId = searchParams.get("id");
  const navigate = useNavigate();

  const [countries, setCountries] = useState<{ name: string }[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    latitude: 0,
    longitude: 0,
    country: "",
  });

  const [loading, setLoading] = useState(true);
  const [tooltips, setTooltips] = useState({
    latitude: false,
    longitude: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [destinationRes, countriesRes] = await Promise.all([
          API.get(`/destinations/${destinationId}`),
          axios.get<Country[]>("https://restcountries.com/v3.1/all"),
        ]);

        const destination = destinationRes.data;

        const sorted = countriesRes.data
          .map((c) => ({ name: c.name.common }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(sorted);

        setFormData({
          name: destination.name,
          description: destination.description,
          latitude:
            destination.latitude || destination.geolocation?.latitude || 0,
          longitude:
            destination.longitude || destination.geolocation?.longitude || 0,
          country: destination.country || "",
        });
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (destinationId) fetchData();
  }, [destinationId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.put(`/destinations/${destinationId}`, {
        name: formData.name,
        description: formData.description,
        country: formData.country,
        geolocation: {
          latitude: Number(formData.latitude),
          longitude: Number(formData.longitude),
        },
      });
      alert("Successfully updated!");
      navigate("/destinations");
    } catch (error) {
      console.error("Error updating destination:", error);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this destination?"
    );
    if (!confirmed || !destinationId) return;

    try {
      await API.delete(`/destinations/${destinationId}`);
      alert("Destination deleted");
      navigate("/destinations");
    } catch (error) {
      console.error("Error deleting destination", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!destinationId) return <p>Invalid ID</p>;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 5, px: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Edit Destination
      </Typography>

      <Box display="flex" justifyContent="center" gap={2} mb={2}>
        <Button variant="contained" type="submit">
          Update
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        gap={2}
        mb={2}
      >
        <TextField
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          size="small"
          sx={inputStyle}
        />

        {/* LATITUDE */}
        <Box position="relative" display="inline-block">
          <TextField
            name="latitude"
            label="Latitude"
            type="number"
            value={formData.latitude}
            onMouseEnter={() => setTooltips((t) => ({ ...t, latitude: true }))}
            onMouseLeave={() => setTooltips((t) => ({ ...t, latitude: false }))}
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              const value = parseFloat(target.value);
              if (value < -90 || value > 90) {
                target.value = "";
              } else {
                setFormData((prev) => ({ ...prev, latitude: value }));
              }
            }}
            inputProps={{ min: -90, max: 90 }}
            size="small"
            sx={inputStyle}
          />
          {tooltips.latitude && (
            <Box
              sx={{
                position: "absolute",
                top: "40px",
                left: 0,
                backgroundColor: "#fff4e5",
                border: "2px solid black",
                borderRadius: "10px",
                padding: "6px 10px",
                fontSize: "12px",
                zIndex: 1,
                whiteSpace: "nowrap",
              }}
            >
              Enter latitude from -90 to 90
              <Box
                sx={{
                  position: "absolute",
                  top: "-10px",
                  left: "20px",
                  width: 0,
                  height: 0,
                  borderBottom: "10px solid black",
                  borderLeft: "10px solid transparent",
                  borderRight: "10px solid transparent",
                }}
              />
            </Box>
          )}
        </Box>

        {/* LONGITUDE */}
        <Box position="relative" display="inline-block">
          <TextField
            name="longitude"
            label="Longitude"
            type="number"
            value={formData.longitude}
            onMouseEnter={() => setTooltips((t) => ({ ...t, longitude: true }))}
            onMouseLeave={() =>
              setTooltips((t) => ({ ...t, longitude: false }))
            }
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              const value = parseFloat(target.value);
              if (value < -180 || value > 180) {
                target.value = "";
              } else {
                setFormData((prev) => ({ ...prev, longitude: value }));
              }
            }}
            inputProps={{ min: -180, max: 180 }}
            size="small"
            sx={inputStyle}
          />
          {tooltips.longitude && (
            <Box
              sx={{
                position: "absolute",
                top: "40px",
                left: 0,
                backgroundColor: "#fff4e5",
                border: "2px solid black",
                borderRadius: "10px",
                padding: "6px 10px",
                fontSize: "12px",
                zIndex: 1,
                whiteSpace: "nowrap",
              }}
            >
              Enter longitude from -180 to 180
              <Box
                sx={{
                  position: "absolute",
                  top: "-10px",
                  left: "20px",
                  width: 0,
                  height: 0,
                  borderBottom: "10px solid black",
                  borderLeft: "10px solid transparent",
                  borderRight: "10px solid transparent",
                }}
              />
            </Box>
          )}
        </Box>

        <TextField
          select
          name="country"
          label="Select country"
          value={formData.country}
          onChange={handleChange}
          size="small"
          sx={inputStyle}
        >
          <MenuItem value="">-</MenuItem>
          {countries.map((c, i) => (
            <MenuItem key={i} value={c.name}>
              {c.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* DESCRIPTION */}
      <Box display="flex" justifyContent="center">
        <TextField
          name="description"
          label="Description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={5}
          fullWidth
          sx={{ maxWidth: "800px" }}
        />
      </Box>
    </Box>
  );
};

export default EditDestination;
