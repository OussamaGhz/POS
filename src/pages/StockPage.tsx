import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import ProductTable from "../components/StockPage/product-table";
import SearchBar from "../components/StockPage/search-bar";
import AddProductDialog from "../components/StockPage/product-dialog";

const products = [
  { id: "1", name: "Nutella Crepe", family: "Crepes", price: 300, amount: 50 },
  {
    id: "2",
    name: "Strawberry Crepe",
    family: "Crepes",
    price: 350,
    amount: 30,
  },
  {
    id: "3",
    name: "Vanilla Gelato",
    family: "Glace gelato",
    price: 250,
    amount: 20,
  },
  {
    id: "4",
    name: "Chocolate Gelato",
    family: "Glace gelato",
    price: 250,
    amount: 15,
  },
  {
    id: "5",
    name: "Soft Serve Ice Cream",
    family: "Glace machine",
    price: 200,
    amount: 25,
  },
  {
    id: "6",
    name: "Frozen Yogurt",
    family: "Glace machine",
    price: 200,
    amount: 10,
  },
  { id: "7", name: "Orange Juice", family: "Jus", price: 150, amount: 40 },
  { id: "8", name: "Apple Juice", family: "Jus", price: 150, amount: 35 },
  { id: "9", name: "Classic Gofre", family: "Gofres", price: 400, amount: 20 },
  {
    id: "10",
    name: "Chocolate Gofre",
    family: "Gofres",
    price: 450,
    amount: 15,
  },
];

const StockPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="w-full h-full flex flex-col gap-4 p-4 ">
      <CardHeader>
        <CardTitle>Stock Page</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex w-full gap-3">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <AddProductDialog />
        </div>
        <ProductTable products={filteredProducts} />
      </CardContent>
    </Card>
  );
};

export default StockPage;
