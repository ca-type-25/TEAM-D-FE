import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { TextField, MenuItem, Button } from "@mui/material";

interface RestCountry {
  name: {
    common: string;
  };
}

const inputStyle: React.CSSProperties = {
  width: "160px",
  marginRight: "6px",
};

const CreateDestination: React.FC = () => {
  const navigate = useNavigate();

  const [countries, setCountries] = useState<{ name: string }[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    latitude: 0,
    longitude: 0,
    country: "",
  });

  const [tooltips, setTooltips] = useState({
    latitude: false,
    longitude: false,
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get<RestCountry[]>(
          "https://restcountries.com/v3.1/all"
        );
        const sorted = res.data
          .map((c) => ({ name: c.name.common }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(sorted);
      } catch (err) {
        console.error("Error fetching countries", err);
      }
    };
    fetchCountries();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const lat = formData.latitude;
    const long = formData.longitude;

    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      lat < -90 ||
      lat > 90 ||
      long < -180 ||
      long > 180 ||
      !formData.country
    ) {
      alert("Please fill in all fields correctly!");
      return;
    }

    const payload = {
      name: formData.name,
      description: formData.description,
      geolocation: {
        latitude: Number(lat),
        longitude: Number(long),
      },
      country: formData.country,
    };

    try {
      await API.post("/destinations", payload);
      alert("Destination created successfully!");
    } catch (err) {
      console.error("Error creating destination:", err);
    }
  };

  return (
    <div style={{ paddingTop: "40px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1>Create New Destination</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "6px",
          }}
        >
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            size="small"
            onChange={handleChange}
            sx={inputStyle}
          />
          <TextField
            name="description"
            label="Description"
            variant="outlined"
            size="small"
            onChange={handleChange}
            sx={inputStyle}
          />

          {/* Latitude */}
          <div style={{ position: "relative", display: "inline-block" }}>
            <TextField
              name="latitude"
              label="Latitude"
              type="number"
              size="small"
              variant="outlined"
              inputProps={{ min: -90, max: 90 }}
              sx={inputStyle}
              onMouseEnter={() =>
                setTooltips((t) => ({ ...t, latitude: true }))
              }
              onMouseLeave={() =>
                setTooltips((t) => ({ ...t, latitude: false }))
              }
              onBeforeInput={(e) => {
                if (!/[-0-9.]$/.test(e.data || "")) {
                  e.preventDefault();
                }
              }}
              onPaste={(e) => {
                const paste = e.clipboardData.getData("text");
                if (!/^[-]?\d*\.?\d*$/.test(paste)) {
                  e.preventDefault();
                }
              }}
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                const value = parseFloat(target.value);
                if (value < -90 || value > 90) {
                  target.value = "";
                } else {
                  setFormData((prev) => ({ ...prev, latitude: value }));
                }
              }}
            />
            {tooltips.latitude && (
              <div
                style={{
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
                <div
                  style={{
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
              </div>
            )}
          </div>

          {/* Longitude */}
          <div style={{ position: "relative", display: "inline-block" }}>
            <TextField
              name="longitude"
              label="Longitude"
              type="number"
              size="small"
              variant="outlined"
              inputProps={{ min: -180, max: 180 }}
              sx={inputStyle}
              onMouseEnter={() =>
                setTooltips((t) => ({ ...t, longitude: true }))
              }
              onMouseLeave={() =>
                setTooltips((t) => ({ ...t, longitude: false }))
              }
              onBeforeInput={(e) => {
                if (!/[-0-9.]$/.test(e.data || "")) {
                  e.preventDefault();
                }
              }}
              onPaste={(e) => {
                const paste = e.clipboardData.getData("text");
                if (!/^[-]?\d*\.?\d*$/.test(paste)) {
                  e.preventDefault();
                }
              }}
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                const value = parseFloat(target.value);
                if (value < -180 || value > 180) {
                  target.value = "";
                } else {
                  setFormData((prev) => ({ ...prev, longitude: value }));
                }
              }}
            />
            {tooltips.longitude && (
              <div
                style={{
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
                <div
                  style={{
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
              </div>
            )}
          </div>

          {/* Country dropdown */}
          <TextField
            select
            name="country"
            label="Country"
            size="small"
            variant="outlined"
            defaultValue=""
            onChange={handleChange}
            sx={inputStyle}
          >
            <MenuItem value="">Select country</MenuItem>
            {countries.map((c, i) => (
              <MenuItem key={i} value={c.name}>
                {c.name}
              </MenuItem>
            ))}
          </TextField>

          {/* Buttons */}
          <Button type="submit" variant="contained" sx={{ height: "40px" }}>
            Create
          </Button>
          <Button
            type="button"
            onClick={() => navigate("/destinations")}
            variant="outlined"
            sx={{ height: "40px" }}
          >
            Back
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateDestination;
