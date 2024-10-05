import React, { useContext, useEffect, useState } from "react";
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
import { get_ord_details, get_user } from "../api";
import { Building2 } from "lucide-react";
import { UserContext } from "../hooks/userProvider";
import Forecast from "./Forecast";

const DashBoard = () => {
  const [org, setOrg] = useState(null);
  const user = useContext(UserContext);

  const fetchOrgDetails = async () => {
    try {
      const res = await get_ord_details(param.id);
      console.log(res.data);
      setOrg(res.data.Organization);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserInfo = async () => {
    console.log(user);
    const response = await get_user();
    console.log(response);

    user.setName(response.data.user.name);
    user.setEmail(response.data.user.email);
    user.setAddress(response.data.user.address);
    user.setPhone_no(response.data.user.phone_no);
    user.setId(response.data.user.id);
    user.setOrgs(response.data.user.orgs);
  };

  useEffect(() => {
    fetchOrgDetails();
    !user.id && getUserInfo();
    console.log(user);
  }, []);
  useEffect(() => {
    console.log(user);
  }, [user]);

  const param = useParams();
  console.log(param);
  return (
    <div className="flex bg-secondary p-0 h-screen overflow-hidden">
      <SideBar />
      <div className="w-full max-h-full flex flex-col gap-1 p-2 text-lg">
        <nav className="bg-foreground w-full px-7 p-2 flex items-center rounded-md text-white justify-between">
          <div className="flex gap-2 font-semibold">
            <Building2 />
            {org?.name || "Organization"}
          </div>
          <div>{user?.name || "User"}</div>
        </nav>
        <div className="grow">
          <Routes>
            <Route path="dashboard" element={<Overview />} />
            <Route path="customers" element={<Customer />} />
            <Route path="items" element={<Item />} />
            <Route path="invoices" element={<Invoice />} />
            <Route path="forecast" element={<Forecast />} />
          </Routes>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
