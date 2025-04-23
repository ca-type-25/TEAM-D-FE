import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../../utils/api";

// Tipas iš restcountries API
interface ExternalCountry {
  name: {
    common: string;
  };
}

const CreateDestination: React.FC = () => {
  const [countries, setCountries] = useState<{ name: string }[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    latitude: 0,
    longitude: 0,
    country: "", // čia saugomas šalies pavadinimas
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get<ExternalCountry[]>(
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Validacija: patikrinam ar laukai užpildyti
    if (
      !formData.name.trim() ||
      !formData.location.trim() ||
      !formData.description.trim() ||
      !formData.latitude ||
      !formData.longitude ||
      !formData.country
    ) {
      alert("Prašome užpildyti visus laukus!");
      return;
    }

    const payload = {
      name: formData.name,
      location: formData.location,
      description: formData.description,
      geolocation: {
        latitude: Number(formData.latitude),
        longitude: Number(formData.longitude),
      },
      countryName: formData.country, // svarbiausias pakeitimas
    };

    try {
      await API.post("/destinations", payload);
      alert("Vieta sėkmingai sukurta!");
    } catch (err) {
      console.error("Klaida kuriant vietą:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create New Destination</h1>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input
        name="location"
        placeholder="Location (city)"
        onChange={handleChange}
      />
      <input
        name="description"
        placeholder="Description"
        onChange={handleChange}
      />
      <input
        name="latitude"
        type="number"
        placeholder="Latitude"
        onChange={handleChange}
      />
      <input
        name="longitude"
        type="number"
        placeholder="Longitude"
        onChange={handleChange}
      />
      <select name="country" onChange={handleChange}>
        <option value="">Select country</option>
        {countries.map((c, i) => (
          <option key={i} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateDestination;
