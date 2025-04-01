import React, { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [sessionId, setSessionId] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const startSession = async () => {
    try {
      const response = await fetch("https://fleetbots-production.up.railway.app/api/session/start", {
        method: "POST",
      });
      const data = await response.json();
      setSessionId(data.session_id);
      router.push("/dashboard");
    } catch (error) {
      setError("Failed to start session");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Start Session</h2>
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={startSession}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Start Fleet Session
        </button>
      </div>
    </div>
  );
}
