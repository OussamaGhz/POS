import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "../ui/table";
import { Commande } from "../../pages/StatsPage";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { DetailDialog } from "./deatail-dialog";

type Transaction = {
  id: number;
  date: string;
  time: string;
  total_price: number;
};

interface HistoriqueProps {
  data: Commande[];
  fetchData: () => void;
}

const HistoriqueAll = ({ data, fetchData }: HistoriqueProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = useState<"date" | "total_price">("date");

  useEffect(() => {
    data.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    const filteredData = data.map((transaction: Transaction) => {
      const date = new Date(transaction.date);
      return {
        ...transaction,
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
      };
    });

    setTransactions(filteredData);
  }, [data]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    setCurrentPage(1);
  };

  const handleSortOrderChange = (field: "date" | "total_price") => {
    setSortField(field);
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8000/commandes/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchData();
      } else {
        console.error("Failed to delete commande");
      }
    } catch (error) {
      console.error("Failed to delete commande:", error);
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    if (!selectedDate) return true;
    const transactionDate = new Date(transaction.date).toLocaleDateString();
    return transactionDate === new Date(selectedDate).toLocaleDateString();
  });

  const sortedTransactions = filteredTransactions.sort((a, b) => {
    if (sortField === "total_price") {
      return sortOrder === "asc"
        ? a.total_price - b.total_price
        : b.total_price - a.total_price;
    } else {
      return sortOrder === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = sortedTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Card className="">
      <CardHeader className="flex justify-between flex-row">
        <CardTitle>Historique</CardTitle>
        <div className="flex items-center gap-4">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="border p-1"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-col h-full">
        <Table>
          <TableHeader className="font-bold">
            <TableRow>
              <TableHead className="max-w-[150px]">Time</TableHead>
              <TableHead>
                <div className="flex items-center">
                  Date
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSortOrderChange("date")}
                    className="ml-2"
                  >
                    <ArrowUpDown className="w-4 h-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                  Total Price
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSortOrderChange("total_price")}
                    className="ml-2"
                  >
                    <ArrowUpDown className="w-4 h-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="cursor-pointer">
            {currentTransactions.map((transaction) => (
              <DetailDialog
                key={transaction.id}
                {...transaction}
                handleDelete={handleDelete}
              />
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between mt-2">
          <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoriqueAll;