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
} from "../ui/table";
import { DialogClose } from "@radix-ui/react-dialog";
import { useNavigate } from "react-router-dom";
import { Trash } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";

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

type DetailDialogProps = Transaction & {
  handleDelete: (id: number) => void;
};

export function DetailDialog({
  id,
  date,
  time,
  total_price,
  handleDelete,
}: DetailDialogProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/commandes/${id}/products`)
      .then((res) => res.json())
      .then((data) => {
        console.log(id);
        console.log(data);
        setProducts(data);
      });
  }, [id]);

  const handlePrint = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [80, 297], // Small printer format
    });

    doc.setFontSize(10);
    doc.text("Transaction Details", 10, 10);
    doc.text(`Transaction ID: ${id}`, 10, 20);
    doc.text(`Date: ${date}`, 10, 30);
    doc.text(`Time: ${time}`, 10, 40);
    doc.text(`Total Price: ${total_price}DA`, 10, 50);

    const tableColumn = [
      "Product Name",
      "Family Name",
      "Quantity",
      "Price",
      "Total",
    ];
    const tableRows: any[] = [];

    products.forEach((product) => {
      const productData = [
        product.name,
        product.family_name,
        product.quantity,
        `${product.selling_price}DA`,
        `${product.selling_price * product.quantity} DA`,
      ];
      tableRows.push(productData);
    });

    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 60,
      theme: "grid",
      styles: {
        fontSize: 8,
      },
    });

    doc.save(`transaction_${id}.pdf`);
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );
    if (confirmed) {
      handleDelete(id);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <TableRow key={id}>
          <TableCell className="font-medium">{time}</TableCell>
          <TableCell>{date}</TableCell>
          <TableCell>{total_price}DA</TableCell>
          <TableCell>
            <Button
              variant="destructive"
              onClick={handleDeleteClick}
              className="ml-2"
            >
              <Trash className="w-4 h-4" />
            </Button>
          </TableCell>
        </TableRow>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
          <DialogDescription>
            Details for transaction ID: {id}
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
        <DialogFooter className="flex justify-between">
          <div>
            <Button variant="default" onClick={handlePrint}>
              Print
            </Button>
            <DialogClose>
              <Button variant="ghost">Close</Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
