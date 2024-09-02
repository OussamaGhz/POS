import React from "react";
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
  id: string;
  time: string;
  total: number;
  date: string;
};

const HistoriqueAll = () => {
  const transactions: Transaction[] = [
    {
      id: "1",
      time: "10:00",

      total: 50.0,
      date: "2023-10-01",
    },
    {
      id: "2",
      time: "11:00",

      total: 30.0,
      date: "2023-10-02",
    },
    {
      id: "3",
      time: "12:00",

      total: 20.0,
      date: "2023-10-03",
    },
  ];

  return (
    <Card className="">
      <CardHeader className="flex justify-between flex-row">
        <CardTitle>Historique</CardTitle>
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
                <TableCell>{transaction.total}$</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default HistoriqueAll;
