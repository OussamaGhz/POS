/* eslint-disable import/no-unresolved */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/src/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/src/components/ui/table";
import { Minus, Plus, TrashIcon } from "lucide-react";
import { Input } from "../ui/input";
import { RootState } from "@/src/store/store";
import { incrementQuantity, decrementQuantity, deleteProduct } from "@/src/store/cartSlice";

const OrderTable = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.cart.products);

  return (
    <div className="h-full border-b-2 overflow-scroll">
      <Table className="">
        <TableHeader className="font-bold">
          <TableRow>
            <TableHead className="w-[80px] hidden md:table-cell">Item</TableHead>
            <TableHead className="max-w-[150px]">Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="hidden md:table-cell">{product.name}</TableCell>
              <TableCell className="font-medium">{product.price}DA</TableCell>
              <TableCell className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => dispatch(decrementQuantity(product.id))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="text"
                  value={product.quantity}
                  className="w-20 text-center"
                  readOnly
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => dispatch(incrementQuantity(product.id))}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </TableCell>
              <TableCell>{product.total}DA</TableCell>
              <TableCell className="hidden md:table-cell">
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => dispatch(deleteProduct(product.id))}
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