"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface RoverData {
  status: string;
  battery: number;
  coordinates: [number, number];
  task: string | null;
  soil_moisture: number;
  soil_pH: number;
  temperature: number;
  battery_level: number;
}

const RoverPage = () => {
  const { roverId } = useParams(); // Dynamically extracts roverId from the URL

  const [roverData, setRoverData] = useState<RoverData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!roverId) {
      setError("No rover ID provided");
      return;
    }

    const fetchRoverData = async () => {
      try {
        const res = await fetch(`https://fleetbots-production.up.railway.app/api/rovers/${roverId}`);
        if (res.ok) {
          const data: RoverData = await res.json();
          setRoverData(data);
        } else {
          setError(`Failed to fetch rover data: ${res.statusText}`);
        }
      } catch (err) {
        setError(`Error fetching rover data: ${err}`);
      }
    };

    fetchRoverData();
  }, [roverId]);

  if (error) return <div>Error: {error}</div>;
  if (!roverData) return <div>Loading...</div>;

  return (
    <div>
      <h1>Rover {roverId} Data</h1>
      <div>Status: {roverData.status}</div>
      <div>Battery: {roverData.battery}%</div>
      <div>Coordinates: {roverData.coordinates.join(", ")}</div>
      <div>Task: {roverData.task || "No task assigned"}</div>
      <div>Soil Moisture: {roverData.soil_moisture}%</div>
      <div>Soil pH: {roverData.soil_pH}</div>
      <div>Temperature: {roverData.temperature}°C</div>
      <div>Battery Level: {roverData.battery_level}%</div>
    </div>
  );
};

export default RoverPage;
