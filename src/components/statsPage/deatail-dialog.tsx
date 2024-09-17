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
import { useNavigate } from "react-router-dom";

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
  cost_price: number;
  selling_price: number;
  quantity: number;
};

export function DetailDialog(transaction: Transaction) {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/commandes/${transaction.id}/products`)
      .then((res) => res.json())
      .then((data) => {
        console.log(transaction.id);
        console.log(data);
        setProducts(data);
      });
  }, [transaction]);

  const handlePrint = () => {
    navigate("/print", { state: { ...transaction, products } });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <TableRow key={transaction.id}>
          <TableCell className="font-medium">{transaction.time}</TableCell>
          <TableCell>{transaction.date}</TableCell>
          <TableCell>{transaction.total_price}DA</TableCell>
        </TableRow>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
          <DialogDescription>
            Details for transaction ID: {transaction.id}
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-auto max-h-[400px]">
          {products.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Family Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.product_id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.family_name}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.selling_price}DA</TableCell>
                    <TableCell>
                      {product.selling_price * product.quantity} DA
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody> 
            </Table>
          ) : (
            <p>No products found for this transaction.</p>
          )}
        </div>
        <DialogFooter>
          <Button variant="default" onClick={handlePrint}>
            Print
          </Button>
          <DialogClose>
            <Button variant="ghost">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}