import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const EXCHANGE_RATE_API_KEY = process.env.EXCHANGE_RATE_API_KEY;
    const EXCHANGE_RATE_API_URL = `https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_API_KEY}/latest/USD`;

    const response = await fetch(EXCHANGE_RATE_API_URL);
    const data = await response.json();

    if (data.result === 'success') {
      const currencies = Object.keys(data.conversion_rates);
      return NextResponse.json(currencies); // Send the list of currencies
    } else {
      return NextResponse.json({ error: 'Unable to fetch currencies list' }, { status: 400 });
    }
  } catch (err) {
    console.error('Error fetching currencies:', err);
    return NextResponse.json({ error: 'Error fetching currencies' }, { status: 500 });
  }
}
