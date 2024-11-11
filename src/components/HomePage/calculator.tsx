"use client";

import React, { useState, useEffect, useCallback } from "react";
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
import { Button } from "../ui/button";

export function CalculatorDialog() {
  const products = useSelector((state: RootState) => state.cart.products);
  const [receivedAmount, setReceivedAmount] = useState<string>("");

  const totalCost = products.reduce(
    (total, product) => total + product.total,
    0
  );

  const change = receivedAmount ? parseFloat(receivedAmount) - totalCost : null;

  const handleNumberClick = (num: string) => {
    setReceivedAmount((prev) => {
      if (prev === "0") return num;
      return prev + num;
    });
  };

  const handleDecimalClick = () => {
    if (!receivedAmount.includes(".")) {
      setReceivedAmount((prev) => prev + ".");
    }
  };

  const handleClearClick = () => {
    setReceivedAmount("");
  };

  const handleBackspaceClick = () => {
    setReceivedAmount((prev) => prev.slice(0, -1));
  };

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key >= "0" && event.key <= "9") {
      handleNumberClick(event.key);
    } else if (event.key === ".") {
      handleDecimalClick();
    } else if (event.key === "Backspace") {
      handleBackspaceClick();
    } else if (event.key === "Escape") {
      handleClearClick();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="border-none">
          <Calculator className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Calculator</DialogTitle>
          <DialogDescription>
            Total Cost: {totalCost.toFixed(2)} DA
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="text-right text-2xl font-bold p-2 bg-gray-100 rounded">
            {receivedAmount || "0"} DA
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
              <Button
                key={num}
                variant="outline"
                onClick={() => handleNumberClick(num.toString())}
              >
                {num}
              </Button>
            ))}
            <Button variant="outline" onClick={handleDecimalClick}>
              .
            </Button>
            <Button variant="outline" onClick={() => handleNumberClick("0")}>
              0
            </Button>
            <Button variant="outline" onClick={handleBackspaceClick}>
              ←
            </Button>
            <Button variant="destructive" onClick={handleClearClick}>
              C
            </Button>
          </div>
          {change !== null && (
            <div className="text-lg font-semibold">
              Change: {change.toFixed(2)} DA
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
