import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../ui/table";

type Product = {
  id: string;
  name: string;
  amount: number;
  price: number;
  family: string;
};

const ProductTable = ({ products }: { products: Product[] }) => {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Product Name</TableHead>
          <TableHead>Available Amount</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Product Family</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.amount}</TableCell>
            <TableCell>{product.price}DA</TableCell>
            <TableCell>{product.family}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
