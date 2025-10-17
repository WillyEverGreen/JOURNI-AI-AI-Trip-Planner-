import React, { useState, useEffect } from "react";

function LocationSearch({ value, onSelect, className }) {
  const [query, setQuery] = useState(value || ""); // ✅ use value from parent
  const [results, setResults] = useState([]);

  // ✅ Update local query if parent value changes
  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  const handleChange = async (e) => {
    const val = e.target.value;
    setQuery(val);

    if (val.length > 2) {
      try {
        const res = await fetch(
          `https://photon.komoot.io/api/?q=${val}&limit=5`
        );
        const data = await res.json();
        setResults(data.features || []);
      } catch (err) {
        console.error("Error fetching locations:", err);
        setResults([]);
      }
    } else {
      setResults([]);
    }
  };

  const handleSelect = (place) => {
    const placeName = place.properties.name;
    setQuery(placeName);
    setResults([]);
    if (onSelect) onSelect(placeName); // pass the selected name to parent
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Enter your destination"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e63946]"
      />

      {results.length > 0 && (
        <ul className="absolute left-0 top-full z-10 w-full bg-white border rounded-lg mt-1 max-h-60 overflow-y-auto shadow-md">
          {results.map((place) => (
            <li
              key={place.properties.osm_id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(place)}
            >
              {place.properties.name},{" "}
              {place.properties.city || place.properties.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LocationSearch;
