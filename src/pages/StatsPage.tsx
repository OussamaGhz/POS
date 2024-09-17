import React, { useEffect, useState } from "react";
import StatCard from "../components/statsPage/stats-card";
import LineChartComponent from "../components/statsPage/line-chart";
import { DollarSign, Users, TrendingUp, ShoppingCart } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import HistoriqueAll from "../components/statsPage/historique-all";
import { set } from "zod";

export interface Transaction {
  id: number;
  date: string;
  time: string;
  total_price: number;
}

export interface Commande {
  id: number;
  date: string;
  total_price: number;
}

const StatsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]); // Ensure data is an array
  const [dayProfit, setDayProfit] = useState(0);
  const [dayClients, setDayClients] = useState(0);
  const [monthProfit, setMonthProfit] = useState(0);
  const [dailyExpenses, setDailyExpenses] = useState(0);
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  const todayStr = yyyy + "-" + mm + "-" + dd;

  useEffect(() => {
    // fetch commandes
    fetch("http://localhost:8000/commandes")
      .then((res) => res.json())
      .then((data) => {
        setCommandes(data);

        const transactions = data.map((transaction: Transaction) => {
          return {
            ...transaction,
            date: transaction.date.split(" ")[0],
          };
        });
        setTransactions(transactions);
        const todayTransactions = data.filter((transaction: Transaction) => {
          const transactionDate = transaction.date.split(" ")[0];
          return transactionDate === todayStr;
        });
        const profit = todayTransactions.reduce(
          (acc: number, transaction: Transaction) => {
            return acc + transaction.total_price;
          },
          0
        );
        setDayProfit(profit);
        const nbClients = todayTransactions.length;
        setDayClients(nbClients);
        // get the total profit of teh current month
        const monthTransactions = data.filter((transaction: Transaction) => {
          const transactionDate = transaction.date.split(" ")[0];
          return transactionDate.split("-")[1] === mm;
        });
        const monthProfit = monthTransactions.reduce(
          (acc: number, transaction: Transaction) => {
            return acc + transaction.total_price;
          },
          0
        );
        setMonthProfit(monthProfit);
      })
      .catch((error) => {
        alert("Failed to fetch commandes:" + error);
      });

    //fetch profit
    fetch("http://localhost:8000/daily-expenses")
      .then((res) => res.json())
      .then((data) => {
        setDailyExpenses(data.daily_expenses);
      })
      .catch((error) => {
        alert("Failed to fetch profits:" + error);
      });
  }, []);
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Daily Profit"
          value={`${dayProfit}DA`}
          icon={<DollarSign className="w-6 h-6 text-green-500" />}
        />
        <StatCard
          title="Daily Clients"
          value={dayClients}
          icon={<Users className="w-6 h-6 text-blue-500" />}
        />
        <StatCard
          title="Monthly Profit"
          value={`${monthProfit}DA`}
          icon={<TrendingUp className="w-6 h-6 text-purple-500" />}
        />
        <StatCard
          title="Daily Expenses"
          value={`${dailyExpenses}DA`}
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
          <LineChartComponent data={transactions} />
        </CardContent>
      </Card>
      <HistoriqueAll data={commandes} />
    </div>
  );
};

export default StatsPage;
