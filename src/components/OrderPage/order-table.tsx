/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
import {
  incrementQuantity,
  decrementQuantity,
  deleteProduct,
} from "@/src/store/cartSlice";
import AlertDialog from "../../AlertDialog";

type props = {
  products: {
    id: string;
    name: string;
    selling_price: number;
    amount: number;
    total: number;
  }[];
};

const OrderTable = (props: props) => {
  const [stockProducts, setProducts] = useState([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertDescription, setAlertDescription] = useState("");

  const dispatch = useDispatch();

  // fetch data
  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => showAlert("Failed to fetch products", err.message));
  }, []);

  const showAlert = (title: string, description: string) => {
    setAlertTitle(title);
    setAlertDescription(description);
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

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
          {props.products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="w-[100px]">{product.name}</TableCell>
              <TableCell className="w-[50px] font-medium">
                {product.selling_price}DA
              </TableCell>
              <TableCell className="w-[50px] flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-10"
                  onClick={() => {
                    dispatch(decrementQuantity(product.id));
                  }}
                >
                  <Minus className="h-6 w-8" />
                </Button>
                <Input
                  type="text"
                  value={product.amount}
                  className="w-20 text-center"
                  readOnly
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => {
                    stockProducts.map((p: any) => {
                      if (p.id === product.id) {
                        if (p.amount <= product.amount) {
                          showAlert("Out of Stock", "Product is out of stock");
                          return;
                        } else {
                          dispatch(incrementQuantity(product.id));
                        }
                      }
                    });
                  }}
                >
                  <Plus className="h-6 w-8" />
                </Button>
              </TableCell>
              <TableCell className="w-[100px] text-center">
                {product.total}DA
              </TableCell>
              <TableCell className="w-[25px] hidden md:table-cell">
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => {
                    dispatch(deleteProduct(product.id));
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

      <AlertDialog
        isOpen={isAlertOpen}
        onClose={handleAlertClose}
        title={alertTitle}
        description={alertDescription}
      />
    </div>
  );
};

export default OrderTable;
