"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function Search() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<null | { id: number; name: string; type: string; growsIn: string; benefits: string[] }[]>(null);
  const [hasSearched, setHasSearched] = useState(false); // NEW STATE
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const [shake, setShake] = useState(false);

  const handleSearch = async () => {
    if (!input) {
    // Shake animation for empty input
      setShake(true); 
      setTimeout(() => setShake(false), 500);
      return;
    }

    try {
      setResults(null); // Clears the result container
      setHasSearched(true); // Chnage the status of hasSearch

      const res = await fetch("/api/veg&fru", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      });

      const data = await res.json();
      setResults(data.results.length > 0 ? data.results : []);
       // Scroll to results
       setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="p-4 border rounded-lg max-w-md mx-auto">
        <i>Enter the name of a fruit or vegetable to find information about it:</i>
      <motion.input
        type="text"
        className="border p-2 w-full mb-2 mt-2"
        placeholder="Search..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        animate={shake ? { x: [-5, 5, -5, 5, 0] } : {}}
        transition={{ duration: 0.3 }}
      />
      <button onClick={handleSearch} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer">
        Search
      </button>

      <div className="mt-4"  ref={resultsRef} >
        {results === null ? null : results.length > 0 ? (
          <ul className="space-y-4">
            {results.map((item) => (
              <li key={item.id} className="p-4 border rounded-lg shadow-sm bg-white">
                <h3 className="text-lg text-gray-400 font-semibold">{item.name} ({item.type})</h3>
                <p className="text-sm text-gray-600">🌍 Grows in: {item.growsIn}</p>
                <ul className="list-disc pl-5 mt-2">
                  {item.benefits.map((benefit, index) => (
                    <li key={index} className="text-sm text-green-700">{benefit}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : hasSearched ? ( // This is why we have hasSearch. Shows this message only if a search has been executed.
          <p>No results found.</p>
        ) : null}
      </div>
    </div>
  );
}
