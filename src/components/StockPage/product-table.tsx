import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../ui/table";
import { TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const ProductTable = ({ products }: { products: any }) => {
  const navigate = useNavigate();
  const deleteHandler = (id: string) => {
    fetch(`http://localhost:8000/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          navigate(0);
        } else {
          console.error("Failed to delete product:", res);
        }
      })
      .catch((err) => console.error("Failed to delete product:", err));
  };
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Product Name</TableHead>
          <TableHead>Available Amount</TableHead>
          <TableHead>Cost</TableHead>
          <TableHead>Selling price</TableHead>
          <TableHead>Product Family</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product: any) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.amount}</TableCell>
            <TableCell>{product.cost_price}DA</TableCell>
            <TableCell>{product.selling_price}DA</TableCell>
            <TableCell>{product.family_name}</TableCell>
            <TableCell>
              <Button
                onClick={() => deleteHandler(product.id)}
                variant="destructive"
              >
                <TrashIcon className="w-5 h-5" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
