import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../utils/api";

// Tipas atitinkantis backend'o destination modelį
interface Destination {
  _id: string;
  name: string;
  description: string;
  geolocation: {
    latitude: number;
    longitude: number;
  };
  country: string; // paprastas string, pvz. "Lithuania"
}

const DestinationItem: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Gaunam ID iš URL
  const navigate = useNavigate(); // Navigacijai atgal
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);

  // Užkraunam konkrečią vietą pagal ID
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
      {/* Grįžimo mygtukas */}
      <button
        onClick={() => navigate("/destinations")}
        style={{ marginBottom: "1rem" }}
      >
        ← Grįžti atgal
      </button>

      {/* Informacija apie vietą */}
      <h1>{destination.name}</h1>
      <p>
        <strong>Šalis:</strong> {destination.country || "Nežinoma"}
      </p>
      <p>
        <strong>Aprašymas:</strong> {destination.description}
      </p>
      {destination.geolocation && (
        <p>
          <strong>Koordinatės:</strong> {destination.geolocation.latitude},{" "}
          {destination.geolocation.longitude}
        </p>
      )}

      {/* Redagavimo mygtukas */}
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
