// lib/recharts.ts

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function renderFleetStatusChart(data: any[]) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="moisture" stroke="#8884d8" />
        <Line type="monotone" dataKey="temperature" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
