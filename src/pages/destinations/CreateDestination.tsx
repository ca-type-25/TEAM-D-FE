import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../../utils/api";

// Tipas gautai šaliai iš API
interface RestCountry {
  name: {
    common: string;
  };
}

// Komponentas naujos vietos kūrimui
const CreateDestination: React.FC = () => {
  // Šalių sąrašas dropdown'ui
  const [countries, setCountries] = useState<{ name: string }[]>([]);

  // Formos duomenų būsena
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    latitude: 0,
    longitude: 0,
    country: "", // šalies pavadinimas kaip string
  });

  // Užkrauna šalis iš REST API tik vieną kartą
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get<RestCountry[]>(
          "https://restcountries.com/v3.1/all"
        );
        const sorted = res.data
          .map((c) => ({ name: c.name.common }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(sorted); // nustatom dropdown'ui
      } catch (err) {
        console.error("Error fetching countries", err);
      }
    };
    fetchCountries();
  }, []);

  // Valdo kiekvieno input'o pasikeitimą
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Kai spaudžiam „Create“ – siunčiam į backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Greita validacija – visi laukai turi būti užpildyti
    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.latitude ||
      !formData.longitude ||
      !formData.country
    ) {
      alert("Prašome užpildyti visus laukus!");
      return;
    }

    // Paruošiam payload su teisinga struktūra backend'ui
    const payload = {
      name: formData.name,
      description: formData.description,
      geolocation: {
        latitude: Number(formData.latitude),
        longitude: Number(formData.longitude),
      },
      country: formData.country,
    };

    // Siunčiam duomenis į backend
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

      {/* Vieta, aprašymas ir koordinatės */}
      <input name="name" placeholder="Name" onChange={handleChange} />
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

      {/* Dropdown'as šalims iš REST API */}
      <select name="country" onChange={handleChange}>
        <option value="">Select country</option>
        {countries.map((c, i) => (
          <option key={i} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Išsaugojimo mygtukas */}
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateDestination;
