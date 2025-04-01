// context/FleetContext.tsx

import { createContext, useContext, useState, ReactNode } from "react";

interface FleetData {
  status: string;
  location: { lat: number; lng: number };
  sensorReadings: { moisture: number; temperature: number };
}

interface FleetContextType {
  fleetData: FleetData | null;
  setFleetData: (data: FleetData | null) => void;
}

const FleetContext = createContext<FleetContextType | undefined>(undefined);

export const FleetProvider = ({ children }: { children: ReactNode }) => {
  const [fleetData, setFleetData] = useState<FleetData | null>(null);

  return (
    <FleetContext.Provider value={{ fleetData, setFleetData }}>
      {children}
    </FleetContext.Provider>
  );
};

export const useFleet = () => {
  const context = useContext(FleetContext);
  if (!context) {
    throw new Error("useFleet must be used within a FleetProvider");
  }
  return context;
};
