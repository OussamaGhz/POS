/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Search, List, ShoppingCart } from "lucide-react";
import { addProduct } from "@/src/store/cartSlice";

type Product = {
  id: string;
  name: string;
  family: string;
  quantity: number;
  total: number;
  selling_price: number;
};

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFamily, setSelectedFamily] = useState("All");
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setProducts(data);
      })
      .catch((error) => console.error(error));
  }, []);

  // filter families
  const families = [
    "All",
    ...new Set(products.map((product) => product.family_name)),
  ];

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedFamily === "All" || product.family_name === selectedFamily)
  );

  const handleAddToCart = (product: Product) => {
    dispatch(
      addProduct({
        ...product,
        amount: 1,
        total: product.selling_price,
      })
    );
  };

  return (
    <Card className="w-full h-full flex flex-col gap-4 py-2 overflow-auto">
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
          <div className="flex gap-2 flex-wrap ">
            {families.map((family) => (
              <Button
                key={family}
                variant={selectedFamily === family ? "default" : "outline"}
                onClick={() => setSelectedFamily(family)}
                className="text-xl font-medium"
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
          <div className="flex flex-col gap-2 text-xl font-medium">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-2 border rounded flex justify-between items-center"
                >
                  {product.name} - {product.selling_price} DA
                  <Button
                    onClick={() =>
                      handleAddToCart({
                        ...product,
                        quantity: 1,
                        total: product.price,
                      })
                    }
                  >
                    Add to Cart
                  </Button>
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
