import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDestinations } from "../../utils/api";

// Tipas atitinkantis destination modelį iš backend
interface Destination {
  _id: string;
  name: string;
  country: string;
  geolocation: {
    longitude: number;
    latitude: number;
  };
  description: string;
}

const DestinationsPage: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 15;
  const sort = "country"; // rūšiavimas pagal šalį
  const navigate = useNavigate();

  // Užkrovimas kai keičiasi puslapis
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await getDestinations(page, limit, sort);
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

      {/* Nuoroda į sukurti naują vietą */}
      <Link to={"/create-destination"}>➕ Pridėti naują vietą</Link>

      <ul>
        {destinations.map((d) => (
          <li key={d._id} style={{ marginBottom: "1rem" }}>
            {/* Vieta ir šalis */}
            <Link to={`/destinations/${d._id}`}>
              <strong>{d.name}</strong>
            </Link>{" "}
            – {d.country || "Nežinoma šalis"}
            <br />
            <small>{d.description}</small>
            <br />
            {/* Redagavimo mygtukas */}
            <button onClick={() => navigate(`/edit-destination?id=${d._id}`)}>
              Edit
            </button>
          </li>
        ))}
      </ul>

      {/* Navigacija tarp puslapių */}
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
