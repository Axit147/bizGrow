import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { HandCoins, IndianRupee, Loader2, ShoppingCart } from "lucide-react";
import { get_dashboard } from "../api";
import { useParams } from "react-router-dom";
import Lottie from "lottie-react";
import Animation from "../assets/lottie/Animation - 1727850616990.json";

const generateRandomData = (min, max) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map((day) => ({
    name: day,
    value: Math.floor(Math.random() * (max - min + 1)) + min,
  }));
};

const BarChartComponent = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
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
      <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);

const LineChartComponent = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
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
      <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="5 5" />
      <Tooltip
        contentStyle={{
          backgroundColor: "hsl(var(--background))",
          border: "1px solid hsl(var(--border))",
          borderRadius: "var(--radius)",
          fontSize: "12px",
        }}
      />
      <Line
        type="monotone"
        dataKey="value"
        stroke="hsl(var(--primary))"
        strokeWidth={2}
        dot={false}
      />
    </LineChart>
  </ResponsiveContainer>
);

const Overview = () => {
  const graphData = generateRandomData(25, 200);
  const params = useParams();
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const res = await get_dashboard(params.id);
    setData(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="h-full flex items-center">
        <Lottie className="h-32 w-32 mx-auto" animationData={Animation} />
        {/* <Loader2 className=" mx-auto animate-spin h-10 w-10" /> */}
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-4 flex flex-col justify-evenly h-full gap-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Card className="flex-1 min-w-[200px]">
          <CardHeader>
            <CardTitle>
              Sales{" "}
              <span className="text-sm font-semibold text-slate-400">
                | Today
              </span>
            </CardTitle>
            <CardDescription>Total sales generated today.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <div className="bg-primary/15 text-green-800 rounded-full w-fit p-2">
              <ShoppingCart className="h-7 w-7" />
            </div>
            <div>
              <p className="font-bold text-2xl">145</p>
              <p className="text-sm font-semibold text-slate-400">
                <span className="text-primary">12%</span> increase
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="flex-1 min-w-[200px]">
          <CardHeader>
            <CardTitle>
              Revenue{" "}
              <span className="text-sm font-semibold text-slate-400">
                | Today
              </span>
            </CardTitle>
            <CardDescription>Total revenue generated today.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <div className="bg-primary/15 text-green-800 rounded-full w-fit p-2">
              <HandCoins className="h-7 w-7" />
            </div>
            <div>
              <p className="font-bold text-2xl">₹145</p>
              <p className="text-sm font-semibold text-slate-400">
                <span className="text-primary">12%</span> increase
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="flex-1 min-w-[200px]">
          <CardHeader>
            <CardTitle>
              Payment recieved{" "}
              <span className="text-sm font-semibold text-slate-400">
                | Today
              </span>
            </CardTitle>
            <CardDescription>Total payment recieved today.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <div className="bg-primary/15 text-green-800 rounded-full w-fit p-2">
              <IndianRupee className="h-7 w-7" />
            </div>
            <div>
              <p className="font-bold text-2xl">₹145</p>
              <p className="text-sm font-semibold text-slate-400">
                <span className="text-primary">12%</span> increase
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* <Card className="w-full">
          <CardHeader>
            <CardTitle>Weekly Bar Chart</CardTitle>
            <CardDescription>Random data visualization</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChartComponent data={graphData} />
          </CardContent>
        </Card> */}

        <Card className="w-full">
          <CardHeader className="flex-row items-center justify-between border-b-2 px-0 mx-6 mb-6">
            <CardTitle className="mb-0">Weekly Sales Report</CardTitle>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="6month">Last 6 Months</SelectItem>
                <SelectItem value="year">last Year</SelectItem>
                <SelectItem value="total">Till Date</SelectItem>
              </SelectContent>
            </Select>
            {/* </div> */}
          </CardHeader>
          <CardContent>
            <LineChartComponent data={graphData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
