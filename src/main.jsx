import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import DashBoard from "./components/DashBoard.jsx";
import Customer from "./components/Customer.jsx";
import Item from "./components/Item.jsx";
import Invoice from "./components/Invoice.jsx";
import "./index.css";
import { Toaster } from "@/components/ui/toaster";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";
import SideBar from "./components/SideBar.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/customers" element={<Customer />} />
        <Route path="/items" element={<Item />} />
        <Route path="/invoices" element={<Invoice />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  </StrictMode>
);
