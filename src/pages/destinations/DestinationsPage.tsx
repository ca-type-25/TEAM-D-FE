import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Turi būti kartu su React importais
import { getDestinations } from "../../utils/api";

interface Destination {
  _id: string;
  name: string;
  location: string;
  description: string;
  latitude: number;
  longitude: number;
  country?: {
    _id: string;
    name: string;
  };
}

const DestinationsPage: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 15;
  const sort = "country.name";
  const navigate = useNavigate(); // 👈 Navigacija

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await getDestinations(page, limit, sort);
        console.log("Gautos vietos:", response.data);
        setDestinations(response.data);
      } catch (error) {
        console.error("Klaida gaunant vietas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [page]);

  if (loading) return <p>Kraunama...</p>;

  return (
    <div>
      <h1>Visos vietos (Destinations)</h1>
      <ul>
        {destinations.map((d) => (
          <li key={d._id} style={{ marginBottom: "1rem" }}>
            <strong>{d.name}</strong> – {d.country?.name || "Nežinoma šalis"}
            <br />
            <small>{d.description}</small>
            <br />
            <em>
              Geo: ({d.latitude}, {d.longitude})
            </em>
            <br />
            {/* Redagavimo mygtukas */}
            <button onClick={() => navigate(`/edit-destination?id=${d._id}`)}>
              Edit
            </button>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "1rem" }}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Ankstesnis
        </button>
        <span style={{ margin: "0 1rem" }}>Puslapis: {page}</span>
        <button onClick={() => setPage((p) => p + 1)}>Kitas</button>
      </div>
    </div>
  );
};

export default DestinationsPage;
