import OrderTable from "../components/OrderPage/order-table";
import { Button } from "../components/ui/button";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../components/ui/card";

import { Separator } from "../components/ui/separator";
import React from "react";

export default function Component() {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full gap-4">
      <div className="order-2 md:order-1 w-full md:w-2/3  p-4 rounded-lg flex flex-col h-full gap-4">
        <div className="h-2/3 ">
          <div className="md:col-span-4 lg:col-span-3 xl:col-span-4 flex flex-col gap-6 h-full">
            <Card className="h-full flex-col justify-between">
              <CardHeader>
                <CardTitle>Commande</CardTitle>
              </CardHeader>
              <CardContent className="flex-col h-full">
                <OrderTable />
                <div className="flex justify-between items-center h-[10%]  font-bold text-4xl">
                  <span className="text-right  flex justify-center items-center">
                    Total:
                  </span>
                  <span>433$</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="h-1/3 ">
          <Card className="">
            <CardHeader>
              <CardTitle>Historique</CardTitle>
            </CardHeader>
            <CardContent className="flex-col h-full"></CardContent>
          </Card>
        </div>
      </div>

      <div className="order-1 md:order-2 w-full md:w-1/3 bg-gray-200 p-4 rounded-lg">
        <h2 className="text-xl font-semibold">Sidebar Content</h2>
        <p>Some content for the sidebar.</p>
      </div>
    </div>
  );
}
