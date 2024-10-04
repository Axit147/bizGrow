import React from "react";
import SideBar from "./SideBar";
import { Outlet, Route, Routes, useParams } from "react-router-dom";
import Customer from "./Customer";
import Item from "./Item";
import Invoice from "./Invoice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import Overview from "./Overview";

const generateRandomData = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map((day) => ({
    name: day,
    total: Math.floor(Math.random() * 100) + 20,
  }));
};

const DashBoard = () => {
  const graphData = generateRandomData();
  const param = useParams();
  console.log(param);
  return (
    <div className="flex bg-secondary p-0 h-screen overflow-hidden">
      <SideBar />
      <div className="w-full max-h-full flex flex-col gap-1 p-2 text-lg">
        <nav className="bg-foreground w-full px-7 p-2 flex items-center rounded-md text-white justify-between">
          <div>Org name</div>
          <div>User name</div>
        </nav>
        <div className="grow">
          <Routes>
            <Route path="dashboard" element={<Overview />} />
            <Route path="customers" element={<Customer />} />
            <Route path="items" element={<Item />} />
            <Route path="invoices" element={<Invoice />} />
          </Routes>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
