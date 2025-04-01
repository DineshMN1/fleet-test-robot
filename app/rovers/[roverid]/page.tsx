"use client"
import { useState, useEffect } from "react";

// Use the defined type for the rover data
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
  
const RoverPage = ({ roverId }: { roverId: string }) => {
  const [roverData, setRoverData] = useState<RoverData | null>(null);

  useEffect(() => {
    const fetchRoverData = async () => {
      try {
        const res = await fetch(`/api/rovers/${roverId}`);
        if (res.ok) {
          const data: RoverData = await res.json();  // Type the response data
          setRoverData(data);
        } else {
          console.error("Failed to fetch rover data");
        }
      } catch (error) {
        console.error("Error fetching rover data:", error);
      }
    };

    fetchRoverData();
  }, [roverId]);

  // Guard clause in case data is not available yet
  if (!roverData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Rover {roverId} Data</h1>
      <div>Status: {roverData.status}</div>
      <div>Battery: {roverData.battery}</div>
      <div>Coordinates: {roverData.coordinates.join(", ")}</div>
      <div>Task: {roverData.task}</div>
      <div>Soil Moisture: {roverData.soil_moisture}</div>
      <div>Soil pH: {roverData.soil_pH}</div>
      <div>Temperature: {roverData.temperature}</div>
      <div>Battery Level: {roverData.battery_level}</div>
    </div>
  );
};

export default RoverPage;
