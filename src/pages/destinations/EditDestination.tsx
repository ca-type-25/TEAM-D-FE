import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../../utils/api";

interface Country {
  _id: string;
  name: string;
}

const EditDestination: React.FC = () => {
  const [searchParams] = useSearchParams();
  const destinationId = searchParams.get("id");
  const navigate = useNavigate();

  const [countries, setCountries] = useState<Country[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    latitude: 0,
    longitude: 0,
    country: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [destinationRes, countriesRes] = await Promise.all([
          API.get(`/destinations/${destinationId}`),
          API.get("/countries"),
        ]);

        const destination = destinationRes.data;
        setCountries(countriesRes.data);

        setFormData({
          name: destination.name,
          location: destination.location,
          description: destination.description,
          latitude:
            destination.latitude || destination.geolocation?.latitude || 0,
          longitude:
            destination.longitude || destination.geolocation?.longitude || 0,
          country: destination.country?._id || "",
        });
      } catch (error) {
        console.error("Klaida kraunant duomenis:", error);
      } finally {
        setLoading(false);
      }
    };

    if (destinationId) fetchData();
  }, [destinationId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.put(`/destinations/${destinationId}`, {
        name: formData.name,
        location: formData.location,
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
      <input
        name="name"
        placeholder="Pavadinimas"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        name="location"
        placeholder="Miestas / vieta"
        value={formData.location}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Aprašymas"
        value={formData.description}
        onChange={handleChange}
      />
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
      <select name="country" value={formData.country} onChange={handleChange}>
        <option value="">Pasirink šalį</option>
        {countries.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>
      <br />
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
