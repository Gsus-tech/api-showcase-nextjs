// Load environment variables from .env file
require('dotenv').config();  // Manually load the .env file

// Import node-fetch to make API requests
const fetch = require('node-fetch');

// Get the API key from the environment variable
const EXCHANGE_RATE_API_KEY = process.env.EXCHANGE_RATE_API_KEY;

if (!EXCHANGE_RATE_API_KEY) {
  console.error("API key is missing. Please set it in the .env file.");
  process.exit(1); // Exit if the API key is not found
}

// Define the API endpoint
const API_URL = `https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_API_KEY}/latest/USD`;

// Function to fetch data from the API
async function testExchangeRateApi() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Log the result from the API
    if (data.result === "success") {
      console.log("Currency Data:", data);
      console.log("Conversion Rates:", data.conversion_rates);
    } else {
      console.error("Error in API response:", data);
    }
  } catch (error) {
    // JavaScript error handling
    console.error("Error fetching API:", error.message);  // Directly access error.message
  }
}

// Call the function
testExchangeRateApi();
