import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "../ui/card";

const data = [
  { name: "Day 1", profit: 400 },
  { name: "Day 2", profit: 300 },
  { name: "Day 3", profit: 500 },
  { name: "Day 4", profit: 200 },
  { name: "Day 5", profit: 278 },
  { name: "Day 6", profit: 189 },
  { name: "Day 7", profit: 239 },
];

const LineChartComponent = () => {
  

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="profit" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default LineChartComponent;
