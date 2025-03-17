"use client";
import { useState, useEffect } from "react";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>(''); // Use string for consistency with input field
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);


  // Fetch available currencies when the page loads
  useEffect(() => {
    const fetchCurrencies = async () => {
      setLoading(true);
      try {
        console.log("Fetching currencies...");
  
        const response = await fetch("/api/currency/get-currencies");
  
        if (!response.ok) {
          throw new Error(`Failed to fetch currencies: ${response.statusText}`);
        }
  
        const data = await response.json();
        console.log("Currencies data received:", data);
        setCurrencies(data); // Set the currencies in the 'select' elements 
      } catch (error) {
        console.error("Error fetching currencies:", error);
        setError("Error fetching currencies");
      } finally {
        setLoading(false);
      }
    };
  
    fetchCurrencies();
  }, []);
  
  

  const handleConvert = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setLoading(true);
    setError(null); // Reset error before starting conversion
    try {
      const response = await fetch(
        `/api/currency/convert?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await response.json();

      if (response.ok) {
        setConvertedAmount(parseFloat(data.convertedAmount));
      } else {
        setError(data.error || "Conversion failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">Currency Converter</h2>
      
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="border p-2 rounded w-full mb-2"
      />
      
      <div className="flex flex-col lg:flex-row sm:justify-between gap-2 mb-2">
      <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="border p-2 rounded w-full sm:w-auto text-gray-500"
        >
            {currencies.length > 0 ? (
              currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))
            ) : (
              <option>Loading currencies...</option>
            )}
        </select>

        <span className="mx-2">➡️</span>

        <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="border p-2 rounded w-full sm:w-auto text-gray-500"
        >
            {currencies.length > 0 ? (
              currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))
            ) : (
              <option>Loading currencies...</option>
            )}
        </select>
      </div>

      <button
        onClick={handleConvert}
        className="bg-blue-500 w-full text-white p-2 rounded hover:bg-blue-600 cursor-pointer"
        disabled={loading}
      >
        {loading ? "Converting..." : "Convert"}
      </button>

      {convertedAmount !== null && (
        <>
        <p className="mt-2 text-green-600">
          Converted Amount:
        </p>
        <h2 className="text-xl font-bold dark:text-white">
          {convertedAmount} {toCurrency}
        </h2>
        </>
      )}

      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
}
