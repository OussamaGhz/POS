import React from "react";
import { useSelector } from "react-redux";
// eslint-disable-next-line import/no-unresolved
import { RootState } from "@/src/store/store";

const Total = () => {
  const products = useSelector((state: RootState) => state.cart.products);

  const totalCost = products.reduce((total, product) => total + product.total, 0);

  return (
    <div className="p-4 space-y-4">
      {/* Other components and elements */}
      <div className="flex justify-end items-center gap-2">
        <span className="text-right flex justify-center items-center">
          Total:
        </span>
        <span>{totalCost}DA</span>
      </div>
    </div>
  );
};

export default Total;