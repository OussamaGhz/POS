export interface product  {
  name: string;
  family: number;
  amount: number;
  unit: string;
  costPrice: number;
  sellingPrice: number;
}

const addProduct = async (product: any) => {
  const body = {
    name: product.name,
    family_id: product.family,
    amount: product.amount,
    unit: product.unit,
    cost_price: product.costPrice,
    selling_price: product.sellingPrice,
  };

  console.log(body);
  

  try {
    const response = await fetch("http://localhost:8000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      return response.json();
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export default addProduct;
