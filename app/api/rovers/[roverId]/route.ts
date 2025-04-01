import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { roverId: string } }) {
  const roverId = params.roverId;
  if (!roverId) {
    return NextResponse.json({ error: "roverId is required" }, { status: 400 });
  }

  try {
    const res = await fetch(`https://fleetbots-production.up.railway.app/api/rover/${roverId}/status`);
    const status = await res.json();

    const coords = await fetch(`https://fleetbots-production.up.railway.app/api/rover/${roverId}/coordinates`).then(res => res.json());
    const battery = await fetch(`https://fleetbots-production.up.railway.app/api/rover/${roverId}/battery`).then(res => res.json());
    const sensors = await fetch(`https://fleetbots-production.up.railway.app/api/rover/${roverId}/sensor-data`).then(res => res.json());

    const fullData = {
      status: status.status ?? "Unknown",
      battery: battery.battery ?? 0,
      coordinates: coords.coordinates ?? [0, 0],
      task: status.task ?? null,
      soil_moisture: sensors.soil_moisture ?? 0,
      soil_pH: sensors.soil_pH ?? 7.0,
      temperature: sensors.temperature ?? 25,
      battery_level: sensors.battery_level ?? 0,
    };

    return NextResponse.json(fullData);
  } catch (error) {
    console.error('Error fetching rover data:', error);
    return NextResponse.json({ error: 'Failed to fetch rover data' }, { status: 500 });
  }
}
