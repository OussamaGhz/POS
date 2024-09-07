import React, { useEffect, useState } from "react";
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
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  family: z.string().min(1, "Family is required"),
  amount: z.number().min(0, "Amount must be a positive number"),
  unit: z.string().min(1, "Unit is required"),
  costPrice: z.number().min(0, "Cost price must be a positive number"),
  sellingPrice: z.number().min(0, "Selling price must be a positive number"),
});

const AddProductDialog = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    family: "",
    amount: "",
    unit: "kg",
    customUnit: "",
    costPrice: "",
    sellingPrice: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    family: false,
    amount: false,
    unit: false,
    costPrice: false,
    sellingPrice: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewProduct((prev) => ({ ...prev, family: e.target.value }));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  // fetch families from the backend
  const [families, setFamilies] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/families")
      .then((res) => res.json())
      .then(setFamilies)
      .catch((err) => console.error("Failed to fetch families:", err));
  }, []);

  const handleSave = () => {
    const result = productSchema.safeParse({
      ...newProduct,
      amount: parseFloat(newProduct.amount),
      costPrice: parseFloat(newProduct.costPrice),
      sellingPrice: parseFloat(newProduct.sellingPrice),
      unit: newProduct.unit === "other" ? newProduct.customUnit : newProduct.unit,
    });

    if (!result.success) {
      const fieldErrors = result.error.errors.reduce(
        (
          acc: { [key: string]: boolean },
          error: { path: (string | number)[] }
        ) => {
          acc[error.path[0] as string] = true;
          return acc;
        },
        {}
      );
      setErrors((prev) => ({ ...prev, ...fieldErrors }));
      return;
    }

    // Handle the save logic here, e.g., send the product details to the backend
    console.log("Product details:", newProduct);
    setErrors({
      name: false,
      family: false,
      amount: false,
      unit: false,
      costPrice: false,
      sellingPrice: false,
    });
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
            onFocus={handleFocus}
            className={`w-full p-2 border rounded ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          <select
            name="family"
            value={newProduct.family}
            onChange={handleFamilyChange}
            onFocus={handleFocus}
            className={`w-full p-2 border rounded ${
              errors.family ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Family</option>
            {families.map((family) => (
              <option key={family.id} value={family.name}>
                {family.name}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <Input
              placeholder="Amount"
              name="amount"
              value={newProduct.amount}
              onChange={handleInputChange}
              onFocus={handleFocus}
              className={`w-full p-2 border rounded ${
                errors.amount ? "border-red-500" : ""
              }`}
            />
            <select
              name="unit"
              value={newProduct.unit}
              onChange={handleInputChange}
              onFocus={handleFocus}
              className={`w-full p-2 border rounded ${
                errors.unit ? "border-red-500" : ""
              }`}
            >
              <option value="kg">kg</option>
              <option value="litres">litres</option>
              <option value="units">units</option>
              <option value="other">Other</option>
            </select>
            {newProduct.unit === "other" && (
              <Input
                placeholder="Custom Unit"
                name="customUnit"
                value={newProduct.customUnit}
                onChange={handleInputChange}
                onFocus={handleFocus}
                className={`w-full p-2 border rounded ${
                  errors.unit ? "border-red-500" : ""
                }`}
              />
            )}
          </div>
          <Input
            placeholder="Cost Price"
            name="costPrice"
            value={newProduct.costPrice}
            onChange={handleInputChange}
            onFocus={handleFocus}
            className={`w-full p-2 border rounded ${
              errors.costPrice ? "border-red-500" : ""
            }`}
          />
          <Input
            placeholder="Selling Price"
            name="sellingPrice"
            value={newProduct.sellingPrice}
            onChange={handleInputChange}
            onFocus={handleFocus}
            className={`w-full p-2 border rounded ${
              errors.sellingPrice ? "border-red-500" : ""
            }`}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave}>Add Product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;