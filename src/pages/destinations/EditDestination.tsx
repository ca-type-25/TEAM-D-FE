import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../../utils/api";

// Tipas šaliai iš REST API
interface Country {
  name: {
    common: string;
  };
}

const EditDestination: React.FC = () => {
  const [searchParams] = useSearchParams();
  const destinationId = searchParams.get("id");
  const navigate = useNavigate();

  // Būsena šalių dropdown'ui
  const [countries, setCountries] = useState<{ name: string }[]>([]);

  // Formos duomenys
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    latitude: 0,
    longitude: 0,
    country: "", // dabar tiesiog string
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Vienu metu gaunam ir destination duomenis, ir šalių sąrašą
        const [destinationRes, countriesRes] = await Promise.all([
          API.get(`/destinations/${destinationId}`),
          axios.get<Country[]>("https://restcountries.com/v3.1/all"),
        ]);

        // Nuskaityti esamos vietos duomenys
        const destination = destinationRes.data;

        // Apdorojam ir rūšiuojam šalis dropdown'ui
        const sorted = countriesRes.data
          .map((c) => ({ name: c.name.common }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(sorted);

        // Užpildom formą su esamais duomenimis
        setFormData({
          name: destination.name,
          description: destination.description,
          latitude:
            destination.latitude || destination.geolocation?.latitude || 0,
          longitude:
            destination.longitude || destination.geolocation?.longitude || 0,
          country: destination.country || "", // šalis kaip string
        });
      } catch (error) {
        console.error("Klaida kraunant duomenis:", error);
      } finally {
        setLoading(false);
      }
    };

    if (destinationId) fetchData();
  }, [destinationId]);

  // Valdo įrašų keitimą
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Siunčia atnaujintus duomenis į backend
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
      alert("Sėkmingai atnaujinta!");
      navigate("/destinations");
    } catch (error) {
      console.error("Klaida atnaujinant vietą:", error);
    }
  };

  // Ištrina vietą
  const handleDelete = async () => {
    const confirmed = window.confirm("Ar tikrai nori ištrinti šią vietą?");
    if (!confirmed || !destinationId) return;

    try {
      await API.delete(`/destinations/${destinationId}`);
      alert("Vieta ištrinta");
      navigate("/destinations");
    } catch (error) {
      console.error("Klaida trinant vietą", error);
    }
  };

  if (loading) return <p>Kraunama...</p>;
  if (!destinationId) return <p>Neteisingas ID</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Redaguoti vietą</h1>

      {/* Pavadinimas */}
      <input
        name="name"
        placeholder="Pavadinimas"
        value={formData.name}
        onChange={handleChange}
      />

      {/* Aprašymas */}
      <textarea
        name="description"
        placeholder="Aprašymas"
        value={formData.description}
        onChange={handleChange}
      />

      {/* Koordinatės */}
      <input
        name="latitude"
        type="number"
        placeholder="Platuma"
        value={formData.latitude}
        onChange={handleChange}
      />
      <input
        name="longitude"
        type="number"
        placeholder="Ilguma"
        value={formData.longitude}
        onChange={handleChange}
      />

      {/* Šalies pasirinkimas (dropdown) */}
      <select name="country" value={formData.country} onChange={handleChange}>
        <option value="">Pasirink šalį</option>
        {countries.map((c) => (
          <option key={c.name} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      <br />

      {/* Atnaujinti / ištrinti */}
      <button type="submit" style={{ marginRight: "10px" }}>
        Atnaujinti
      </button>
      <button
        type="button"
        onClick={handleDelete}
        style={{ backgroundColor: "red", color: "white" }}
      >
        Ištrinti
      </button>
    </form>
  );
};

export default EditDestination;
