import React from "react";
import SideBar from "./SideBar";
import { Outlet, Route, Routes, useParams } from "react-router-dom";
import Customer from "./Customer";
import Item from "./Item";
import Invoice from "./Invoice";

const DashBoard = () => {
  const param = useParams();
  console.log(param);
  return (
    <div className="flex">
      <SideBar />
      <div className="w-full">
        <Routes>
          <Route path="customers" element={<Customer />} />
          <Route path="items" element={<Item />} />
          <Route path="invoices" element={<Invoice />} />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;
