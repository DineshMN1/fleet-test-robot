import React, { useState } from "react";

export default function Settings() {
  const [constraints, setConstraints] = useState({
    communication: "limited",
    power: "optimized",
  });

  const handleConstraintChange = (e) => {
    const { name, value } = e.target;
    setConstraints((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Fleet Constraints & Settings</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Communication</label>
        <select
          name="communication"
          value={constraints.communication}
          onChange={handleConstraintChange}
          className="p-2 border rounded"
        >
          <option value="limited">Limited</option>
          <option value="unlimited">Unlimited</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Power Optimization</label>
        <select
          name="power"
          value={constraints.power}
          onChange={handleConstraintChange}
          className="p-2 border rounded"
        >
          <option value="optimized">Optimized</option>
          <option value="non-optimized">Non-Optimized</option>
        </select>
      </div>
    </div>
  );
}
