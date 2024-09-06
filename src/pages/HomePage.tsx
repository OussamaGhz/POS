import Commandes from "../components/HomePage/commandes";
import Historique from "../components/HomePage/hitorique";
import ProductSearch from "../components/HomePage/products";
import React from "react";
import { Button } from "../components/ui/button";

export default function Component() {
  const fetchdata = async () => {
    fetch("http://localhost:8000/products")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };
  return (
    <div className="flex flex-col md:flex-row h-screen w-full gap-4">
      <div className="order-2 md:order-1 w-full md:w-2/3  p-4 rounded-lg flex flex-col h-full gap-4">
       
        <div className="h-2/3">
          <Commandes />
        </div>

        <div className="h-1/3">
          <Historique />
        </div>
      </div>

      <div className="order-1 md:order-2 w-full md:w-1/3">
        <ProductSearch />
      </div>
    </div>
  );
}
