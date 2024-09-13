import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import DashBoard from "./components/DashBoard.jsx";
import "./index.css";
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProvider from "./hooks/userProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="/:id/*" element={<DashBoard />} />
        </Routes>
        <Toaster />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
