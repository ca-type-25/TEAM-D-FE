import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../utils/api";

// Duomenų struktūra
interface Destination {
  _id: string;
  name: string;
  location: string;
  description: string;
  geolocation: {
    latitude: number;
    longitude: number;
  };
  country?: {
    _id: string;
    name: string;
  };
}

const DestinationItem: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // ID iš URL
  const navigate = useNavigate(); // Navigacijai atgal
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);

  // Užkrovimas kai keičiasi ID
  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const res = await API.get(`/destinations/${id}`);
        setDestination(res.data);
      } catch (err) {
        console.error("Klaida gaunant duomenis:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  if (loading) return <p>Kraunama...</p>;
  if (!destination) return <p>Vieta nerasta</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <button
        onClick={() => navigate("/destinations")}
        style={{ marginBottom: "1rem" }}
      >
        ← Grįžti atgal
      </button>

      <h1>{destination.name}</h1>
      <p>
        <strong>Šalis:</strong> {destination.country?.name || "Nežinoma"}
      </p>
      <p>
        <strong>Miestas / vieta:</strong> {destination.location}
      </p>
      <p>
        <strong>Aprašymas:</strong> {destination.description}
      </p>
      <p>
        <strong>Koordinatės:</strong> {destination.geolocation.latitude},{" "}
        {destination.geolocation.longitude}
      </p>

      <button
        style={{ marginTop: "1rem" }}
        onClick={() => navigate(`/edit-destination?id=${destination._id}`)}
      >
        ✏️ Redaguoti šią vietą
      </button>
    </div>
  );
};

export default DestinationItem;
