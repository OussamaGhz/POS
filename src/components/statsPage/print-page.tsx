import React from "react";
import { useLocation } from "react-router-dom";

type Product = {
  product_id: number;
  name: string;
  family_name: string;
  amount: number;
  cost_price: number;
  selling_price: number;
  quantity: number;
};

type Transaction = {
  id: number;
  date: string;
  time: string;
  total_price: number;
  products: Product[];
};

const PrintPage: React.FC = () => {
  const location = useLocation();
  const transaction = location.state as Transaction;

  return (
    <div style={{ padding: "10px", fontFamily: "monospace" }}>
      <h2>Transaction Details</h2>
      <p>ID: {transaction.id}</p>
      <p>Date: {transaction.date}</p>
      <p>Time: {transaction.time}</p>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "5px" }}>Product Name</th>
            <th style={{ border: "1px solid black", padding: "5px" }}>Family Name</th>
            <th style={{ border: "1px solid black", padding: "5px" }}>Quantity</th>
            <th style={{ border: "1px solid black", padding: "5px" }}>Price</th>
            <th style={{ border: "1px solid black", padding: "5px" }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {transaction.products.map((product) => (
            <tr key={product.product_id}>
              <td style={{ border: "1px solid black", padding: "5px" }}>{product.name}</td>
              <td style={{ border: "1px solid black", padding: "5px" }}>{product.family_name}</td>
              <td style={{ border: "1px solid black", padding: "5px" }}>{product.quantity}</td>
              <td style={{ border: "1px solid black", padding: "5px" }}>{product.selling_price}DA</td>
              <td style={{ border: "1px solid black", padding: "5px" }}>
                {product.selling_price * product.quantity} DA
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total Price: {transaction.total_price}DA</p>
    </div>
  );
};

export default PrintPage;