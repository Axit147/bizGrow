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
    <div className="flex bg-secondary">
      <SideBar />
      <div className="w-full">
        <Routes>
          <Route path="dashboard" element={<Overview />} />
          <Route path="customers" element={<Customer />} />
          <Route path="items" element={<Item />} />
          <Route path="invoices" element={<Invoice />} />
        </Routes>
        <Outlet />
      </div>
      {/* <div className="w-full max-w-6xl mx-auto p-4 space-y-8">
        <div className="flex flex-col sm:flex-row gap-4">
          {[1, 2, 3].map((cardNumber) => (
            <Card key={cardNumber} className="flex-1 min-w-[200px]">
              <CardHeader>
                <CardTitle>Card {cardNumber}</CardTitle>
                <CardDescription>
                  This is card number {cardNumber}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card content goes here.</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Weekly Data</CardTitle>
            <CardDescription>Random data visualization</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={graphData}>
                <XAxis
                  dataKey="name"
                  stroke="hsl(var(--foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                    fontSize: "12px",
                  }}
                />
                <Bar
                  dataKey="total"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div> */}
    </div>
  );
};

export default DashBoard;
