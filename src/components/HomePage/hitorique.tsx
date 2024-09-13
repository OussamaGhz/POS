import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

type Transaction = {
  id: number;
  date: string;
  time: string;
  total_price: number;
};

const Historique = () => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/commandes")
      .then((res) => res.json())
      .then((data) => {
       console.log(data);
        // sort by latest date and time
        data.sort((a: Transaction, b: Transaction) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        // split date and time
        data.forEach((transaction: Transaction) => {
          const date = new Date(transaction.date);
          transaction.date = date.toLocaleDateString();
          transaction.time = date.toLocaleTimeString();
        });

        // get only 3 latest transactions
        setTransactions(data.slice(0, 3));
      })
      .catch((error) => {
        alert("Failed to fetch commandes:" + error);
      });
  }, []);

  return (
    <Card className="">
      <CardHeader className="flex justify-between flex-row">
        <CardTitle>Historique</CardTitle>
        <Link to={"/stats"}>
          <Button variant="link">See all</Button>
        </Link>
      </CardHeader>
      <CardContent className="flex-col h-full">
        <Table className="">
          <TableHeader className="font-bold">
            <TableRow>
              <TableHead className="max-w-[150px]">Time</TableHead>

              <TableHead>Date</TableHead>
              <TableHead>Total Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">
                  {transaction.time}
                </TableCell>

                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.total_price}DA</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Historique;
