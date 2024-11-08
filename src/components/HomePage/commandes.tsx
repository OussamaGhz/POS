/* eslint-disable import/no-unresolved */
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  // eslint-disable-next-line import/no-unresolved
} from "@/src/components/ui/card";
import OrderTable from "../OrderPage/order-table";
import { Button } from "../ui/button";
import Total from "./total";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { CalculatorDialog } from "./calculator";

const Commandes = () => {
  const products = useSelector((state: RootState) => state.cart.products);
  console.log(products);
  

  const validOrder = () => {
    // get total price
    const total_price = products.reduce(
      (acc, product) => acc + product.total,
      0
    );

    // fetch POST /commandes
    fetch("http://localhost:8000/commandes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ total_price, products }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Failed to create commande");
      })
      .then((data) => {
        console.log("Commande created:", data);
      })
      .catch((error) => {
        console.error("Failed to create commande:", error);
      });

    window.location.reload();
  };

  if (products.length === 0) {
    return (
      <div className="md:col-span-4 lg:col-span-3 xl:col-span-4 flex flex-col gap-6 h-full">
        <Card className="h-full flex-col justify-between">
          <CardHeader>
            <CardTitle>Commande</CardTitle>
          </CardHeader>
          <CardContent className="flex-col h-[80%]">
            <div className="flex flex-col items-center justify-center h-full">
              <span className="text-2xl font-bold">Votre panier est vide</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="md:col-span-4 lg:col-span-3 xl:col-span-4 flex flex-col gap-6 h-full">
      <Card className="h-full flex-col justify-between">
        <CardHeader>
          <CardTitle>Commande</CardTitle>
        </CardHeader>
        <CardContent className="flex-col h-[80%]">
          <OrderTable products={products} />
          <div className="flex flex-col md:flex-row justify-between items-center h-[20%] font-bold text-2xl md:text-4xl">
            {/* Total */}
            <Total />
            <div className="flex gap-3">
              <Button
                className=" text-xl md:text-2xl font-semibold "
                variant="outline"
              >
                <CalculatorDialog />
              </Button>
              <Button
                className=" text-xl md:text-2xl font-semibold"
                onClick={validOrder}
              >
                Valider
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Commandes;
