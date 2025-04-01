import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest, { params }: { params?: { roverId?: string } }) {
  console.log('Received params:', params);  // Log params to verify
  if (!params?.roverId) {
    return NextResponse.json({ error: "roverId is required" }, { status: 400 });
  }

  const { roverId } = params;
  console.log(`Fetching data for rover: ${roverId}`);

  try {
    const res = await fetch(`https://fleetbots-production.up.railway.app/api/${roverId}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch data for rover: ${roverId}`);
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching rover data:', error);  // Additional logging
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
