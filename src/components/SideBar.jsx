import {
  ChartLine,
  ChevronLeft,
  LayoutDashboard,
  Menu,
  NotebookPen,
  ReceiptIndianRupee,
  ShoppingBag,
  UsersRound,
} from "lucide-react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`h-screen w-full p-3 overflow-hidden ${
        isOpen ? "max-w-[300px]" : "max-w-[60px]"
      } bg-black transition-all duration-300 flex flex-col items-center`}
    >
      <div className={`${isOpen ? "ml-auto" : "mx-auto"} mr-2`}>
        {!isOpen ? (
          <Menu
            onClick={() => setIsOpen(!isOpen)}
            className={`text-primary h-10 w-10 transition duration-150 hover:bg-white/20 rounded`}
          />
        ) : (
          <ChevronLeft
            onClick={() => setIsOpen(!isOpen)}
            className={`text-primary h-10 w-10 transition duration-150 hover:bg-white/20 rounded`}
          />
        )}
      </div>

      {isOpen && (
        <div className="text-3xl font-extrabold text-background absolute top-3 left-3">
          <span className="text-primary">Biz</span>Grow
        </div>
      )}
      <div className="w-full text-white mt-5 flex flex-col gap-5">
        <NavLink
          to={"/:id/dashboard"}
          className={({ isActive, isPending }) =>
            `w-full ${
              isActive ? "hover:opacity-75" : "hover:bg-white/20"
            } flex gap-3.5 rounded items-center p-1 py-2 transition duration-150 text-lg ${
              isActive && "bg-white text-foreground "
            } ${isOpen ? "px-4" : "px-0.5"}`
          }
        >
          <LayoutDashboard className="h-8 w-8 shrink-0" />
          Dashboard
        </NavLink>
        <NavLink
          to={"/:id/customers"}
          className={({ isActive, isPending }) =>
            `w-full ${
              isActive ? "hover:opacity-75" : "hover:bg-white/20"
            } flex gap-3.5 rounded items-center p-1 py-2 transition duration-150 text-lg ${
              isActive && "bg-white text-foreground "
            } ${isOpen ? "px-4" : "px-0.5"}`
          }
        >
          <UsersRound className="h-8 w-8 shrink-0" />
          Customer
        </NavLink>
        <NavLink
          to={"/:id/items"}
          className={({ isActive, isPending }) =>
            `w-full ${
              isActive ? "hover:opacity-75" : "hover:bg-white/20"
            } flex gap-3.5 rounded items-center p-1 py-2 transition duration-150 text-lg ${
              isActive && "bg-white text-foreground "
            } ${isOpen ? "px-4" : "px-0.5"}`
          }
        >
          <ShoppingBag className="h-8 w-8 shrink-0" />
          Items
        </NavLink>
        <NavLink
          to={"/:id/invoices"}
          className={({ isActive, isPending }) =>
            `w-full ${
              isActive ? "hover:opacity-75" : "hover:bg-white/20"
            } flex gap-3.5 rounded items-center p-1 py-2 transition duration-150 text-lg ${
              isActive && "bg-white text-foreground "
            } ${isOpen ? "px-4" : "px-0.5"}`
          }
        >
          <NotebookPen className="h-8 w-8 shrink-0" />
          Invoices
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
