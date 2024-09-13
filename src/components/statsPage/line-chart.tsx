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

import { Transaction } from "../../pages/StatsPage";

// interface Transaction  {
//   id: number;
//   date: string;
//   time: string; yyyy-mm-dd hh:mm:ss
//   total_price: number;
// }

interface LineChartComponentProps {
  data: Transaction[];
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({ data }) => {
  console.log(data);

  const chartdata = data.map((transaction) => {
    return {
      date: transaction.date.split(" ")[0],
      total_price: transaction.total_price,
    };
  });

  // Group transactions by date and calculate total price for each day
  const result = chartdata.reduce((acc: Record<string, number>, { date, total_price }) => {
    if (!acc[date]) {
      acc[date] = 0; // Initialize the total price for the date if not present
    }
    acc[date] += total_price; // Add the total price of the current transaction
    return acc;
  }, {});  

  // Format the result into an array of objects
  const formattedResult = Object.entries(result).map(([date, total_price]) => ({
    // date without the year
    date: date.split("-").slice(1).join("-"),  
    total_price,
  }));

  // get at most the last 10 days
  const last10Days = formattedResult.slice(-10);


  

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={last10Days}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total_price" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
   
    </Card>
  );
};

export default LineChartComponent;
