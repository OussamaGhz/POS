import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../ui/dialog";
import { Input } from "../ui/input";

const AddProductDialog = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    family: "",
    amount: "",
    unit: "kg",
    costPrice: "",
    sellingPrice: "",
  });

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
};

  return (
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
  );
};

export default AddProductDialog;