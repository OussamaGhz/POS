import { ShoppingBasket, Warehouse, ChartArea } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const getLinkClasses = (path: string) => {
    const isActive = location.pathname === path;
    return `flex items-center p-6 rounded-lg space-x-4 transition-colors delay-75 ${
      isActive
        ? "bg-primary text-primary-foreground"
        : "hover:bg-gray-100 text-gray-800 dark:text-gray-400"
    }`;
  };

  return (
    <aside className="flex flex-col  bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-700 h-screen items-center px-1">
      <div className="h-16 flex items-center justify-center border-b-2 my-7">
       
      </div>
      <ul className="flex flex-col gap-2 ">
        <Link to="/" className={getLinkClasses("/")}>
          <ShoppingBasket className="h-5 w-7" />
        </Link>
        <Link to="/stock" className={getLinkClasses("/stock")}>
          <Warehouse className="h-5 w-7" />
        </Link>
        <Link to="/stats" className={getLinkClasses("/stats")}>
          <ChartArea className="h-5 w-7" />
        </Link>
      </ul>
    </aside>
  );
};

export default Sidebar;
