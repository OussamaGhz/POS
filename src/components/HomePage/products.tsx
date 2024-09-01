/* eslint-disable import/no-unresolved */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Search, List, ShoppingCart } from "lucide-react";
import { addProduct } from "@/src/store/cartSlice";
import Product from "@/src/utils/types";

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFamily, setSelectedFamily] = useState("All");
  const dispatch = useDispatch();
  const families = ["All", "Fruits", "Vegetables", "Dairy", "Meat"];
  const products = [
    { id: "1", name: "Apple", family: "Fruits", price: 1.0 },
    { id: "2", name: "Carrot", family: "Vegetables", price: 0.5 },
    { id: "3", name: "Milk", family: "Dairy", price: 1.5 },
    { id: "4", name: "Chicken", family: "Meat", price: 5.0 },
  ];

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedFamily === "All" || product.family === selectedFamily)
  );

  const handleAddToCart = (product: Product) => {
    dispatch(
      addProduct({
        ...product,
        quantity: 1,
        total: product.price,
      })
    );
  };

  return (
    <Card className="w-full h-full flex flex-col gap-4 p-4">
      <CardHeader>
        <CardTitle>Product Search</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          <Input
            placeholder="Search for a product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <List className="w-5 h-5" />
            <span className="text-2xl font-bold">Family:</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {families.map((family) => (
              <Button
                key={family}
                variant={selectedFamily === family ? "default" : "outline"}
                onClick={() => setSelectedFamily(family)}
              >
                {family}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <span className="text-2xl font-bold">Products:</span>
          </div>
          <div className="flex flex-col gap-2">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="p-2 border rounded flex justify-between items-center">
                  {product.name}
                  <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                </div>
              ))
            ) : (
              <span>No products found</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductSearch;