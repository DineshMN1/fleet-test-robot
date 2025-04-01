import { useState, useEffect } from "react";
import Head from "next/head";
import { FleetStatus } from "@/app/components/FleetStatus";
import { LiveMap } from "@/app/components/LiveMap";
import { SensorData } from "@/app/components/SensorData";
import { TaskControl } from "@/app/components/TaskControl";
import { FailSafeAlerts } from "@/app/components/FailSafeAlerts";
import { ConstraintsPanel } from "@/app/components/ConstraintsPanel";
import { Sidebar } from "@/app/components/sections/Sidebar";
import { Header } from "@/app/components/sections/Header";
import { fetchFleetStatus } from "@/app/utils/api";
import { FleetProvider } from "@/app/context/FleetContext";

export default function Dashboard() {
  const [sessionId, setSessionId] = useState(null);
  const [fleetData, setFleetData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function startSession() {
      try {
        const response = await fetch("https://fleetbots-production.up.railway.app/api/session/start", {
          method: "POST",
        });
        const data = await response.json();
        setSessionId(data.session_id);
      } catch (error) {
        console.error("Error starting session:", error);
      }
    }
    startSession();
  }, []);

  useEffect(() => {
    if (!sessionId) return;
    async function getFleetData() {
      try {
        const data = await fetchFleetStatus(sessionId);
        setFleetData(data);
      } catch (error) {
        console.error("Error fetching fleet status:", error);
      } finally {
        setLoading(false);
      }
    }
    getFleetData();
  }, [sessionId]);

  return (
    <FleetProvider>
      <Head>
        <title>Slambots Dashboard</title>
      </Head>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            {loading ? (
              <p>Loading fleet data...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FleetStatus data={fleetData} />
                <LiveMap data={fleetData} />
                <SensorData data={fleetData} />
                <TaskControl sessionId={sessionId} />
                <FailSafeAlerts data={fleetData} />
                <ConstraintsPanel />
              </div>
            )}
          </main>
        </div>
      </div>
    </FleetProvider>
  );
}
