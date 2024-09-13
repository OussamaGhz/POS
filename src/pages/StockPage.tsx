import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import ProductTable from "../components/StockPage/product-table";
import SearchBar from "../components/StockPage/search-bar";
import AddProductDialog from "../components/StockPage/product-dialog";
import AddFamilyDialog from "../components/StockPage/family-dialog";
import { product } from "../utils/AddProduct";

const StockPage = () => {
  const [products, setProducts] = useState<product[]>([]);
  // fetch data
  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((err) => alert(`Failed to fetch products: ${err}`));
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-screen p-4">
      <Card className="w-full h-full flex flex-col gap-4 p-4 ">
        <CardHeader>
          <CardTitle>Stock Page</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex w-full gap-3">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <AddProductDialog />
            <AddFamilyDialog />
          </div>
          <ProductTable products={filteredProducts} />
        </CardContent>
      </Card>
    </div>
  );
};

export default StockPage;
