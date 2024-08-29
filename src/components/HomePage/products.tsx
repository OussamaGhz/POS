import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Search, List, ShoppingCart } from "lucide-react";

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFamily, setSelectedFamily] = useState("");
  const families = ["Fruits", "Vegetables", "Dairy", "Meat"];
  const products = [
    { name: "Apple", family: "Fruits" },
    { name: "Carrot", family: "Vegetables" },
    { name: "Milk", family: "Dairy" },
    { name: "Chicken", family: "Meat" },
  ];

  const filteredProducts = products.filter(
    (product) =>
      product.family === selectedFamily &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <div key={product.name} className="p-2 border rounded">
                  {product.name}
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