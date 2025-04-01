import React from "react";

export function FleetStatus({ data }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold">Fleet Status</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}



**LiveMap.tsx**

import React from "react";

export function LiveMap({ data }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold">Live Map</h2>
      <p>Map visualization goes here.</p>
    </div>
  );
}