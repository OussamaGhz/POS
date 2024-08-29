/* eslint-disable import/no-unresolved */
import React from "react";
import { Button } from "@/src/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/src/components/ui/table";
import { TrashIcon } from "lucide-react";

type Row = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
};

const OrderTable = () => {
  const data: Row[] = [
    {
      id: "1",
      name: "ddd",
      price: 2.99,
      quantity: 2,
      total: 30.0,
    },
    {
      id: "2",
      name: "ddd",
      price: 2.99,
      quantity: 2,
      total: 30.0,
    },
  ];
  return (
    <div className="h-full border-b-2  overflow-scroll ">
      <Table className="">
        <TableHeader className="font-bold">
          <TableRow>
            <TableHead className="w-[80px] hidden md:table-cell">
              Item
            </TableHead>
            <TableHead className="max-w-[150px]">Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="hidden md:table-cell">{row.name}</TableCell>
              <TableCell className="font-medium">{row.price}$</TableCell>
              <TableCell>
                <input type="text" value={row.quantity}/>
              </TableCell>
              <TableCell>{row.total}$</TableCell>
              <TableCell className="hidden md:table-cell">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    alert("delete");
                  }}
                >
                  <TrashIcon className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderTable;
