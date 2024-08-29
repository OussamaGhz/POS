import React from "react";
import StatCard from "../components/statsPage/stats-card";
import LineChartComponent from "../components/statsPage/line-chart";
import { DollarSign, Users, TrendingUp, ShoppingCart } from "lucide-react";
import Historique from "../components/HomePage/hitorique";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const StatsPage = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Daily Profit"
          value="$500"
          icon={<DollarSign className="w-6 h-6 text-green-500" />}
        />
        <StatCard
          title="Daily Clients"
          value="120"
          icon={<Users className="w-6 h-6 text-blue-500" />}
        />
        <StatCard
          title="Monthly Profit"
          value="$15,000"
          icon={<TrendingUp className="w-6 h-6 text-purple-500" />}
        />
        <StatCard
          title="Daily Expenses"
          value="$200"
          icon={<ShoppingCart className="w-6 h-6 text-red-500" />}
        />
      </div>
      <Card className="p4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold mb-4">
            Daily Profit Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LineChartComponent />
        </CardContent>
      </Card>
      <Historique />
    </div>
  );
};

export default StatsPage;
