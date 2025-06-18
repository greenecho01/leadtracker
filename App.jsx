
import { useState } from "react";

const mockProperties = [
  {
    postcode: "BN1 3AA",
    houseNumber: "12",
    epcRating: "E",
    gas: false,
    wallInsulation: "None",
    loftInsulation: "Partial",
    tenure: "Homeowner",
    yearBuilt: 1965,
  },
  {
    postcode: "BN1 3AA",
    houseNumber: "14",
    epcRating: "F",
    gas: true,
    wallInsulation: "Cavity",
    loftInsulation: "None",
    tenure: "Private Tenant",
    yearBuilt: 1950,
  },
  {
    postcode: "BN1 3AA",
    houseNumber: "16",
    epcRating: "D",
    gas: true,
    wallInsulation: "Solid",
    loftInsulation: "Full",
    tenure: "Homeowner",
    yearBuilt: 1975,
  },
];

export default function SmartLeadTracker() {
  const [postcode, setPostcode] = useState("");
  const [results, setResults] = useState([]);
  const [checked, setChecked] = useState({});

  const handleSearch = () => {
    const filtered = mockProperties.filter(
      (p) =>
        p.postcode.toLowerCase() === postcode.toLowerCase() &&
        ["D", "E", "F", "G"].includes(p.epcRating) &&
        p.yearBuilt < 1990
    );
    setResults(filtered);
  };

  const toggleCheck = (index) => {
    setChecked({ ...checked, [index]: !checked[index] });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-green-700">
        Smart Lead Tracker
      </h1>
      <div className="flex gap-2 mb-6">
        <input
          className="border p-2 w-full"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          placeholder="Enter postcode (e.g. BN1 3AA)"
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="space-y-4">
        {results.length === 0 && (
          <p className="text-gray-500 text-center">
            No properties found. Try another postcode.
          </p>
        )}

        {results.map((property, index) => (
          <div
            key={index}
            className={\`border p-4 rounded shadow \${checked[index] ? "opacity-40" : "opacity-100"}\`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">
                  {property.houseNumber}, {property.postcode}
                </h2>
                <p>EPC: {property.epcRating}</p>
                <p>Built: {property.yearBuilt}</p>
                <p>Tenure: {property.tenure}</p>
                <p>Gas: {property.gas ? "Yes" : "No"}</p>
                <p>Wall Insulation: {property.wallInsulation}</p>
                <p>Loft Insulation: {property.loftInsulation}</p>
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={!!checked[index]}
                  onChange={() => toggleCheck(index)}
                  className="w-6 h-6"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
