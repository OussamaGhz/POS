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
            <TableHead className="w-[100px]">Item</TableHead>
            <TableHead className="w-[50px]">Price</TableHead>
            <TableHead className="w-[50px]">Quantity</TableHead>
            <TableHead className="w-[100px] text-center">Total</TableHead>
            <TableHead className="w-[25px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="w-[100px]">{product.name}</TableCell>
              <TableCell className="w-[50px] font-medium">{product.price}DA</TableCell>
              <TableCell className="w-[50px] flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-10"
                  onClick={() => dispatch(decrementQuantity(product.id))}
                >
                  <Minus className="h-6 w-8" />
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
                  className="h-8 w-8"
                  onClick={() => dispatch(incrementQuantity(product.id))}
                >
                  <Plus className="h-6 w-8" />
                </Button>
              </TableCell>
              <TableCell className="w-[100px] text-center">{product.total}DA</TableCell>
              <TableCell className="w-[25px] hidden md:table-cell">
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