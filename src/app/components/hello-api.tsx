"use client";

import { useState } from "react";

export default function ApiButton() {
  const [message, setMessage] = useState("");

  const fetchMessage = async () => {
    const res = await fetch("/api/hello/");
    const data = await res.json();
    setMessage(data.message);

    // Remove the message for a cleaner UI
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  return (
    <>
    <p className="mb-2">Test my API connection:</p>
    <div className="flex space-x-5">
      <button
        onClick={fetchMessage}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
        >
        Call API
      </button>
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
    </>
  );
}
