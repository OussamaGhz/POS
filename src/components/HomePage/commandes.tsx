/* eslint-disable import/no-unresolved */
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/src/components/ui/card";
import OrderTable from "../OrderPage/order-table";
import { Button } from "../ui/button";

const Commandes = () => {
  return (
    <div className="md:col-span-4 lg:col-span-3 xl:col-span-4 flex flex-col gap-6 h-full">
      <Card className="h-full flex-col justify-between">
        <CardHeader>
          <CardTitle>Commande</CardTitle>
        </CardHeader>
        <CardContent className="flex-col h-[80%]">
          <OrderTable />
          <div className="flex flex-col md:flex-row justify-between items-center h-[20%] font-bold text-2xl md:text-4xl">
            <div className="flex gap-2 md:gap-5 items-center">
              <span className="text-right flex justify-center items-center">
                Total:
              </span>
              <span>433$</span>
            </div>
            <Button className=" text-xl md:text-2xl font-semibold">
              Valider
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Commandes;
