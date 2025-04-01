import React, { useState } from "react";
import { fetchFleetStatus } from "@/app/utils/api";

export default function ApiTest() {
  const [status, setStatus] = useState(null);
  const [sessionId, setSessionId] = useState("");

  const handleFetchStatus = async () => {
    const data = await fetchFleetStatus(sessionId);
    setStatus(data);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">API Test</h2>
      <div>
        <input
          type="text"
          placeholder="Enter Session ID"
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
          className="p-2 border rounded mb-4"
        />
        <button
          onClick={handleFetchStatus}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Fetch Fleet Status
        </button>
      </div>
      {status && <pre className="mt-4">{JSON.stringify(status, null, 2)}</pre>}
    </div>
  );
}
