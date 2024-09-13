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
      <nav className="bg-foreground p-2">
        <Sheet className="dark">
          <SheetTrigger className="border-2 border-primary rounded-md p-0.5 hover:opacity-80 transition">
            <Menu className="text-primary" />
          </SheetTrigger>
          <SheetContent side={"left"} className="w-[300px]">
            <SheetHeader>
              <span>Biz</span>
              <span>Grow</span>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </nav>
      <Routes></Routes>
    </div>
  );
};

export default DashBoard;
