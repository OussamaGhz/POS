import React, { useEffect, useState } from "react";
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
import EditProductDialog from "./product-edit";

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

  const [families, setFamilies] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/families")
      .then((res) => res.json())
      .then(setFamilies)
      .catch((err) => console.error("Failed to fetch families:", err));
  }, []);

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Product Name</TableHead>
          <TableHead>Available Amount</TableHead>
          <TableHead>Cost</TableHead>
          <TableHead>Selling price</TableHead>
          <TableHead>Product Family</TableHead>
          <TableHead>Actions</TableHead>
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
            <TableCell className="flex gap-2">
              <EditProductDialog product={product} families={families} />
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