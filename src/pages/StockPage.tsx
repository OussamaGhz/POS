import React, { useState } from "react";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../components/ui/table";
import { Search } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../components/ui/dialog";

const products = [
  { id: "1", name: "Apple", amount: 50, price: 1.2, family: "Fruits" },
  { id: "2", name: "Carrot", amount: 30, price: 0.8, family: "Vegetables" },
  { id: "3", name: "Milk", amount: 20, price: 1.5, family: "Dairy" },
  { id: "4", name: "Chicken", amount: 15, price: 5.0, family: "Meat" },
];

const StockPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    family: "",
    amount: "",
    unit: "kg",
    costPrice: "",
    sellingPrice: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="w-full h-full flex flex-col gap-4 p-4 shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle>Stock Page</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex w-full gap-3">
          <div className="flex items-center gap-2 border-b pb-2 w-full">
            <Search className="w-5 h-5 text-gray-500" />
            <Input
              placeholder="Search for a product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add new product</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Fill in the details below to add a new product.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                <Input
                  placeholder="Product Name"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
                <Input
                  placeholder="Product Family"
                  name="family"
                  value={newProduct.family}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
                <div className="flex gap-2">
                  <Input
                    placeholder="Amount"
                    name="amount"
                    value={newProduct.amount}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                  <select
                    name="unit"
                    value={newProduct.unit}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="kg">kg</option>
                    <option value="litres">litres</option>
                    <option value="units">units</option>
                  </select>
                </div>
                <Input
                  placeholder="Cost Price"
                  name="costPrice"
                  value={newProduct.costPrice}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
                <Input
                  placeholder="Selling Price"
                  name="sellingPrice"
                  value={newProduct.sellingPrice}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button>Add Product</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Available Amount</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Product Family</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.amount}</TableCell>
                <TableCell>{product.price}$</TableCell>
                <TableCell>{product.family}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default StockPage;