import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts/route-layout";
import HomePage from "./pages/HomePage";
import StatsPage from "./pages/StatsPage";
import StockPage from "./pages/StockPage";

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
      ],
    },
  ]);

  // Return the RouterProvider with the created router
  return <RouterProvider router={router} />;
}

export default App;
