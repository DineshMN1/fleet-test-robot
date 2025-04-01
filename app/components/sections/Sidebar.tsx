"use client"
import { useState } from "react";

export function Sidebar({ onRoverClick }: { onRoverClick: (roverId: string) => void }) {
  const rovers = [
    { id: "rover1", name: "Rover 1" },
    { id: "rover2", name: "Rover 2" },
    { id: "rover3", name: "Rover 3" },
    { id: "rover4", name: "Rover 4" },
    { id: "rover5", name: "Rover 5" },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white">
      <div className="p-4">
        <h2>Dashboard</h2>
        <div className="mt-6">
          <h3 className="font-bold">Rovers:</h3>
          <ul>
            {rovers.map((rover) => (
              <li key={rover.id}>
                <button
                  className="text-white hover:bg-blue-600 p-2 rounded-md w-full text-left"
                  onClick={() => onRoverClick(rover.id)}
                >
                  {rover.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
