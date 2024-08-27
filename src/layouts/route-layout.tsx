// src/Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";

const Layout: React.FC = () => {
  return (
    <div className="flex w-screen gap-4 overflow-auto px-4">
      <Sidebar />
      <main className="w-full">
        <Outlet /> {/* This will render the matched route's component */}
      </main>
    </div>
  );
};

export default Layout;
