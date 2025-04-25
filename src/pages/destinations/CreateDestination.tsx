import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../../utils/api";
import { useNavigate } from "react-router-dom";

// Tipas šalims, gautoms iš REST API, naudojamas dropdown pasirinkimui
interface RestCountry {
  name: {
    common: string;
  };
}

// Universalus input ir mygtukų stilius, kad UI būtų nuoseklus ir švarus
const inputStyle: React.CSSProperties = {
  width: "160px",
  height: "30px",
  padding: "5px",
  fontSize: "14px",
  marginRight: "4px",
  boxSizing: "border-box",
};

// Komponentas atsakingas už naujos kelionės vietos sukūrimą
const CreateDestination: React.FC = () => {
  const navigate = useNavigate(); // Router funkcija grįžimui į ankstesnį puslapį

  // Šalių sąrašas dropdown'ui
  const [countries, setCountries] = useState<{ name: string }[]>([]);

  // Formos duomenys, valdomi per React state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    latitude: 0,
    longitude: 0,
    country: "",
  });

  // Tooltip'ų parodymo būsena – valdoma per state
  const [tooltips, setTooltips] = useState({
    latitude: false,
    longitude: false,
  });

  // useEffect – užkrauna šalių sąrašą tik vieną kartą, kai komponentas užsikrauna
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get<RestCountry[]>(
          "https://restcountries.com/v3.1/all"
        );
        const sorted = res.data
          .map((c) => ({ name: c.name.common }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(sorted); // Išsaugom šalis į state
      } catch (err) {
        console.error("Error fetching countries", err);
      }
    };
    fetchCountries();
  }, []);

  // Funkcija keičia formos laukų reikšmes (tik paprasti tekstiniai input'ai ir select)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Formos pateikimas – validuojame laukus ir siunčiame į backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const lat = formData.latitude;
    const long = formData.longitude;

    // Patikriname ar visi laukai užpildyti ir reikšmės atitinka nustatytas ribas
    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      lat < -90 ||
      lat > 90 ||
      long < -180 ||
      long > 180 ||
      !formData.country
    ) {
      alert("Prašome užpildyti visus laukus teisingai!");
      return;
    }

    // Paruošiame duomenų objektą, kuris atitinka backend'o struktūrą
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
      await API.post("/destinations", payload); // Duomenų siuntimas į serverį
      alert("Vieta sėkmingai sukurta!");
    } catch (err) {
      console.error("Klaida kuriant vietą:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create New Destination</h1>

      {/* Įvesties laukeliai: pavadinimas ir aprašymas */}
      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        name="description"
        placeholder="Description"
        onChange={handleChange}
        style={inputStyle}
      />

      {/* LATITUDE laukas su validacija ir tooltip'u */}
      <div style={{ position: "relative", display: "inline-block" }}>
        <input
          name="latitude"
          type="number"
          placeholder="Latitude"
          min={-90}
          max={90}
          style={inputStyle}
          onMouseEnter={() => setTooltips((t) => ({ ...t, latitude: true }))}
          onMouseLeave={() => setTooltips((t) => ({ ...t, latitude: false }))}
          onBeforeInput={(e) => {
            // Leidžiami tik skaičiai, taškas ir minusas
            if (!/[-0-9.]$/.test(e.data || "")) {
              e.preventDefault();
            }
          }}
          onPaste={(e) => {
            // Draudžiam įklijuoti tekstą, jei jis neatitinka leidžiamų simbolių
            const paste = e.clipboardData.getData("text");
            if (!/^[-]?\d*\.?\d*$/.test(paste)) {
              e.preventDefault();
            }
          }}
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            const value = parseFloat(target.value);
            // Automatiškai išvalo reikšmę, jei ji už ribų
            if (value < -90 || value > 90) {
              target.value = "";
            } else {
              setFormData((prev) => ({ ...prev, latitude: value }));
            }
          }}
        />
        {/* Tooltip su paaiškinimu – kada pelė virš lauko */}
        {tooltips.latitude && (
          <div
            style={{
              position: "absolute",
              top: "-45px",
              left: "0",
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
                bottom: "-10px",
                left: "20px",
                width: 0,
                height: 0,
                borderTop: "10px solid black",
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
              }}
            />
          </div>
        )}
      </div>

      {/* LONGITUDE laukas su tooltip'u ir reikšmės apribojimais */}
      <div style={{ position: "relative", display: "inline-block" }}>
        <input
          name="longitude"
          type="number"
          placeholder="Longitude"
          min={-180}
          max={180}
          style={inputStyle}
          onMouseEnter={() => setTooltips((t) => ({ ...t, longitude: true }))}
          onMouseLeave={() => setTooltips((t) => ({ ...t, longitude: false }))}
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
              top: "-45px",
              left: "0",
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
                bottom: "-10px",
                left: "20px",
                width: 0,
                height: 0,
                borderTop: "10px solid black",
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
              }}
            />
          </div>
        )}
      </div>

      {/* Šalių pasirinkimo dropdown, gautas iš API */}
      <select name="country" onChange={handleChange} style={inputStyle}>
        <option value="">Select country</option>
        {countries.map((c, i) => (
          <option key={i} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Mygtukai: Create (submit) ir Back (navigacija atgal) */}
      <div style={{ display: "inline-flex", gap: "6px" }}>
        <button type="submit" style={{ ...inputStyle, width: "auto" }}>
          Create
        </button>
        <button
          type="button"
          onClick={() => navigate("/destinations")}
          style={{ ...inputStyle, width: "auto" }}
        >
          Back
        </button>
      </div>
    </form>
  );
};

export default CreateDestination;
