import { NextRequest, NextResponse } from 'next/server';

// Conversion logic
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const amount = searchParams.get('amount');
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  if (!amount || !from || !to) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
  }

  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  try {
    // Fetch conversion rate from the external API
    const EXCHANGE_RATE_API_KEY = process.env.EXCHANGE_RATE_API_KEY; //Load api key from .env file
    const EXCHANGE_RATE_API_URL = `https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_API_KEY}/pair/${from}/${to}/${parsedAmount}`;

    const response = await fetch(EXCHANGE_RATE_API_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch conversion rate: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.result === "success") {
      const convertedAmount = data.conversion_result;
      return NextResponse.json({
        convertedAmount: convertedAmount.toFixed(2),
      });
    } else {
      return NextResponse.json({ error: "Unable to convert currencies" }, { status: 400 });
    }
  } catch (err) {
    console.error("Error converting currencies:", err);
    return NextResponse.json({ error: "Error converting currencies" }, { status: 500 });
  }
}
