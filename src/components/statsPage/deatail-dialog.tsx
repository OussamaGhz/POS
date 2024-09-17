import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableCaption,
} from "../ui/table";
import { DialogClose } from "@radix-ui/react-dialog";

type Transaction = {
  id: number;
  date: string;
  time: string;
  total_price: number;
};

type Product = {
  product_id: number;
  name: string;
  family_name: string;
  amount: number;
  unit: string;
  cost_price: number;
  selling_price: number;
  quantity: number;
};

export function DetailDialog(transaction: Transaction) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`http://localhost:8000/commandes/${transaction.id}/products`)
      .then((res) => res.json())
      .then((data) => {
        console.log(transaction.id);
        console.log(data);
        setProducts(data);
      });
  }, [transaction]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <TableRow key={transaction.id}>
          <TableCell className="font-medium">{transaction.time}</TableCell>
          <TableCell>{transaction.date}</TableCell>
          <TableCell>{transaction.total_price}DA</TableCell>
        </TableRow>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
          <DialogDescription>
            Details for transaction ID: {transaction.id}
          </DialogDescription>
        </DialogHeader>
        <div>
          {products.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Family Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.product_id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.family_name}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.unit}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No products found for this transaction.</p>
          )}
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant="ghost">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
