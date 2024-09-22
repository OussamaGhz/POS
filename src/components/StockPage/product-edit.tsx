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
import { z } from "zod";
import { Edit2 } from "lucide-react";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  family: z.number().min(1, "Family is required"),
  amount: z.number().min(0, "Amount must be a positive number"),
  unit: z.string().min(1, "Unit is required"),
  cost_price: z.number().min(0, "Cost price must be a positive number"),
  selling_price: z.number().min(0, "Selling price must be a positive number"),
});

const EditProductDialog = ({
  product,
  families,
  onProductUpdated,
}: {
  product: any;
  families: any;
  onProductUpdated: () => void;
}) => {
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    family: product.family_id?.toString(),
    amount: product.amount?.toString(),
    unit: product.unit,
    customUnit: "",
    cost_price: product.cost_price?.toString(),
    selling_price: product.selling_price?.toString(),
  });

  const [errors, setErrors] = useState({
    name: false,
    family: false,
    amount: false,
    unit: false,
    cost_price: false,
    selling_price: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUpdatedProduct((prev) => ({ ...prev, family: e.target.value }));
  };

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSave = () => {
    const result = productSchema.safeParse({
      ...updatedProduct,
      amount: parseFloat(updatedProduct.amount),
      cost_price: parseFloat(updatedProduct.cost_price),
      selling_price: parseFloat(updatedProduct.selling_price),
      unit:
        updatedProduct.unit === "other"
          ? updatedProduct.customUnit
          : updatedProduct.unit,
      family: parseInt(updatedProduct.family, 10),
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

    const body = {
      name: result.data.name,
      family_id: result.data.family,
      amount: result.data.amount,
      unit: result.data.unit,
      cost_price: result.data.cost_price,
      selling_price: result.data.selling_price,
    };

    fetch(`http://localhost:8000/products/${product.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.ok) {
          onProductUpdated(); // Call the callback to update the products list
        } else {
          alert("Failed to update product:" + res);
        }
      })
      .catch((err) => alert(`Failed to update product: ${err}`));

    setErrors({
      name: false,
      family: false,
      amount: false,
      unit: false,
      cost_price: false,
      selling_price: false,
    });

    setOpen(false); // Close the modal after saving
  };

  const [open, setOpen] = useState(false); // State for modal visibility

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Edit2 className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Modify the details below to update the product.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Product Name"
            name="name"
            value={updatedProduct.name}
            onChange={handleInputChange}
            onFocus={handleFocus}
            className={`w-full p-2 border rounded ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          <select
            name="family"
            value={updatedProduct.family}
            onChange={handleFamilyChange}
            onFocus={handleFocus}
            className={`w-full p-2 border rounded ${
              errors.family ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Family</option>
            {families.map((family: any) => (
              <option key={family.id} value={family.id}>
                {family.name}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <Input
              placeholder="Amount"
              name="amount"
              value={updatedProduct.amount}
              onChange={handleInputChange}
              onFocus={handleFocus}
              className={`w-full p-2 border rounded ${
                errors.amount ? "border-red-500" : ""
              }`}
            />
            <select
              name="unit"
              value={updatedProduct.unit}
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
            {updatedProduct.unit === "other" && (
              <Input
                placeholder="Custom Unit"
                name="customUnit"
                value={updatedProduct.customUnit}
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
            name="cost_price"
            value={updatedProduct.cost_price}
            onChange={handleInputChange}
            onFocus={handleFocus}
            className={`w-full p-2 border rounded ${
              errors.cost_price ? "border-red-500" : ""
            }`}
          />
          <Input
            placeholder="Selling Price"
            name="selling_price"
            value={updatedProduct.selling_price}
            onChange={handleInputChange}
            onFocus={handleFocus}
            className={`w-full p-2 border rounded ${
              errors.selling_price ? "border-red-500" : ""
            }`}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
