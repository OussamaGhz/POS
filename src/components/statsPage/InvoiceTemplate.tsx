import React from "react";

export const InvoiceTemplate = ({
  transaction,
  products,
}: {
  transaction: { id: number; date: string; time: string; total_price: number };
  products: { name: string; family_name: string; quantity: number; selling_price: number }[];
}) => {
  return (
    <div id="invoice">
      <h1>Sales Invoice</h1>
      <p>Invoice No: {transaction.id}</p>
      <p>Date: {transaction.date}</p>
      <p>Time: {transaction.time}</p>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Family Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.family_name}</td>
              <td>{product.quantity}</td>
              <td>{product.selling_price}DA</td>
              <td>{product.quantity * product.selling_price}DA</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total Price: {transaction.total_price}DA</p>
    </div>
  );
};
