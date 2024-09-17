import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts/route-layout";
import HomePage from "./pages/HomePage";
import StatsPage from "./pages/StatsPage";
import StockPage from "./pages/StockPage";
import PrintPage from "./components/statsPage/print-page";// Import the PrintPage component

function App() {
  // Define the router with routes
  const router = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "stock", element: <StockPage /> },
        { path: "stats", element: <StatsPage /> },
        { path: "print", element: <PrintPage /> }, // Add the PrintPage route
      ],
    },
  ]);

  // Return the RouterProvider with the created router
  return <RouterProvider router={router} />;
}

export default App;