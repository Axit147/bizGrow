import {
  BrainCircuit,
  ChartLine,
  ChevronLeft,
  LayoutDashboard,
  Menu,
  NotebookPen,
  ReceiptIndianRupee,
  ShoppingBag,
  TrendingUpDown,
  UsersRound,
} from "lucide-react";
import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();

  return (
    <div
      className={`h-screen w-full p-3 overflow-hidden z-10 ${
        isOpen ? "max-w-[300px]" : "max-w-[75px]"
      } bg-black transition-all duration-300 flex flex-col items-center`}
    >
      <div
        className={`${
          isOpen ? "ml-auto" : "mx-auto"
        } p-2.5 hover:bg-white/20 rounded transition duration-150 z-10 cursor-pointer`}
      >
        {!isOpen ? (
          <Menu
            onClick={() => setIsOpen(!isOpen)}
            className={`text-primary h-8 w-8`}
          />
        ) : (
          <ChevronLeft
            onClick={() => setIsOpen(!isOpen)}
            className={`text-primary h-8 w-8`}
          />
        )}
      </div>

      {/* {isOpen && ( */}
      <div
        className={`${
          isOpen ? "opacity-100" : "opacity-0"
        } transition duration-300 text-3xl font-extrabold text-background absolute top-5 left-3`}
      >
        <span className="text-primary">Biz</span>Grow
      </div>
      {/* )} */}
      <div className="w-full text-white mt-5 flex flex-col gap-4">
        <NavLink
          to={`/${params.id}/dashboard`}
          className={({ isActive, isPending }) =>
            `w-full ${
              isActive ? "hover:opacity-75" : "hover:bg-white/20"
            } flex gap-3.5 rounded items-center p-2.5 overflow-hidden transition duration-300 text-lg ${
              isActive && "bg-white text-foreground "
            }`
          }
        >
          <div
            className={`${
              isOpen ? "translate-x-3" : "translate-x-0"
            } flex gap-3.5 rounded items-center transition-transform duration-500`}
          >
            <LayoutDashboard className="h-8 w-8 shrink-0" />
            Dashboard
          </div>
        </NavLink>
        <NavLink
          to={`/${params.id}/customers`}
          className={({ isActive, isPending }) =>
            `w-full ${
              isActive ? "hover:opacity-75" : "hover:bg-white/20"
            } flex gap-3.5 rounded items-center p-2.5 overflow-hidden transition duration-300 text-lg ${
              isActive && "bg-white text-foreground "
            }`
          }
        >
          <div
            className={`${
              isOpen ? "translate-x-3" : "translate-x-0"
            } flex gap-3.5 rounded items-center transition-transform duration-500`}
          >
            <UsersRound className="h-8 w-8 shrink-0" />
            Customer
          </div>
        </NavLink>
        <NavLink
          to={`/${params.id}/items`}
          className={({ isActive, isPending }) =>
            `w-full ${
              isActive ? "hover:opacity-75" : "hover:bg-white/20"
            } flex gap-3.5 rounded items-center p-2.5 overflow-hidden transition duration-300 text-lg ${
              isActive && "bg-white text-foreground "
            }`
          }
        >
          <div
            className={`${
              isOpen ? "translate-x-3" : "translate-x-0"
            } flex gap-3.5 rounded items-center transition-transform duration-500`}
          >
            <ShoppingBag className="h-8 w-8 shrink-0" />
            Items
          </div>
        </NavLink>
        <NavLink
          to={`/${params.id}/invoices`}
          className={({ isActive, isPending }) =>
            `w-full ${
              isActive ? "hover:opacity-75" : "hover:bg-white/20"
            } flex gap-3.5 rounded items-center p-2.5 overflow-hidden transition duration-300 text-lg ${
              isActive && "bg-white text-foreground "
            }`
          }
        >
          <div
            className={`${
              isOpen ? "translate-x-3" : "translate-x-0"
            } flex gap-3.5 rounded items-center transition-transform duration-500`}
          >
            <NotebookPen className="h-8 w-8 shrink-0" />
            Invoices
          </div>
        </NavLink>
        <NavLink
          to={`/${params.id}/forecast`}
          className={({ isActive, isPending }) =>
            `w-full ${
              isActive ? "hover:opacity-75" : "hover:bg-white/20"
            } flex gap-3.5 rounded items-center p-2.5 overflow-hidden transition duration-300 text-lg ${
              isActive && "bg-white text-foreground "
            }`
          }
        >
          <div
            className={`${
              isOpen ? "translate-x-3" : "translate-x-0"
            } flex gap-3.5 rounded items-center transition-transform duration-500`}
          >
            <BrainCircuit className="h-8 w-8 shrink-0" />
            Sales forecast
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
