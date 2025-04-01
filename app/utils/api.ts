// utils/api.ts

export async function fetchFleetStatus(sessionId: string) {
    const response = await fetch(
      `https://fleetbots-production.up.railway.app/api/fleet/status?session_id=${sessionId}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch fleet status");
    }
    return await response.json();
  }
  