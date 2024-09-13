import React from "react";
import SideBar from "./SideBar";
import { Routes } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const DashBoard = () => {
  return (
    <div>
      {/* <SideBar /> */}
      <Sheet left>
        <SheetTrigger className="border-2 border-black rounded-md p-0.5 hover:bg-slate-200 transition">
          <Menu />
        </SheetTrigger>
        <SheetContent side={"left"}></SheetContent>
      </Sheet>
      <Routes></Routes>
    </div>
  );
};

export default DashBoard;
