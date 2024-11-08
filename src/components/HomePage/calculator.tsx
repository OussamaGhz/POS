import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../ui/dialog";
import { Calculator } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const CalculatorDialog = () => {
  const products = useSelector((state: RootState) => state.cart.products);
  const [receivedAmount, setReceivedAmount] = useState<number | "">("");

  const totalCost = products.reduce(
    (total, product) => total + product.total,
    0
  );

  const change = typeof receivedAmount === "number" ? receivedAmount - totalCost : null;

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" size="default">
          <Calculator className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Total Cost: {totalCost.toFixed(2)}</DialogTitle>
          <DialogDescription>Enter the amount received to calculate the change.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="number"
            placeholder="Amount Received"
            value={receivedAmount}
            onChange={(e) => setReceivedAmount(parseFloat(e.target.value))}
          />
          {change !== null && (
            <p className="text-lg font-semibold">
              Change to return: {change.toFixed(2)}
            </p>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" size="default">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { CalculatorDialog };