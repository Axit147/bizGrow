import {
  ChartLine,
  ChevronLeft,
  LayoutDashboard,
  Menu,
  ReceiptIndianRupee,
  ShoppingBag,
  UsersRound,
} from "lucide-react";
import React, { useState } from "react";

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
        <div
          className={`w-full hover:bg-white/20 flex gap-3.5 rounded items-center p-1 py-2 transition duration-150 ${
            isOpen ? "px-4" : "px-0.5"
          } text-lg`}
        >
          <LayoutDashboard className="text-background h-8 w-8 shrink-0" />
          Dashboard
        </div>
        <div
          className={`w-full hover:bg-white/20 flex gap-3.5 rounded items-center p-1 py-2 transition duration-150 ${
            isOpen ? "px-4" : "px-0.5"
          } text-lg`}
        >
          <UsersRound className="text-background h-8 w-8 shrink-0" />
          Customer
        </div>
        <div
          className={`w-full hover:bg-white/20 flex gap-3.5 rounded items-center p-1 py-2 transition duration-150 ${
            isOpen ? "px-4" : "px-0.5"
          } text-lg`}
        >
          <ShoppingBag className="text-background h-8 w-8 shrink-0" />
          Items
        </div>
        <div
          className={`w-full hover:bg-white/20 flex gap-3.5 rounded items-center p-1 py-2 transition duration-150 ${
            isOpen ? "px-4" : "px-0.5"
          } text-lg`}
        >
          <ReceiptIndianRupee className="text-background h-8 w-8 shrink-0" />
          Invoices
        </div>
      </div>
    </div>
  );
};

export default SideBar;
