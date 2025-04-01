// hooks/useFleetData.ts

import { useState, useEffect } from "react";
import { fetchFleetStatus } from "@/app/utils/api";

export function useFleetData(sessionId: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) return;
    async function getData() {
      try {
        const fleetData = await fetchFleetStatus(sessionId);
        setData(fleetData);
      } catch (error) {
        console.error("Failed to fetch fleet data:", error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [sessionId]);

  return { data, loading };
}
