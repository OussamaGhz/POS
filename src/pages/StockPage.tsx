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
  { id: "1", name: "Apple", amount: 50, price: 1.2, family: "Fruits" },
  { id: "2", name: "Carrot", amount: 30, price: 0.8, family: "Vegetables" },
  { id: "3", name: "Milk", amount: 20, price: 1.5, family: "Dairy" },
  { id: "4", name: "Chicken", amount: 15, price: 5.0, family: "Meat" },
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
