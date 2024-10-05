import React, { useEffect, useState } from "react";
import { get_forecast, train_model } from "../api";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import Lottie from "lottie-react";
import Animation from "../assets/lottie/Animation - 1727850616990.json";
import { Button } from "./ui/button";
import { useToast } from "../hooks/use-toast";

const Forecast = () => {
  const params = useParams();
  const { toast } = useToast();
  const [data, setData] = useState([]);
  const [isTraining, setIsTraining] = useState(false);

  const fetchForecast = async () => {
    const res = await get_forecast(params.id);
    console.log(res.data);
    setData(res.data);
  };

  useEffect(() => {
    fetchForecast();
  }, []);

  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-[60vw]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Sales Forecast</CardTitle>
            <Button
              onClick={async () => {
                setIsTraining(true);
                try {
                  const res = await train_model(params.id);
                  toast({
                    title: "Success...",
                    description: res.data.Message,
                  });
                  fetchForecast();
                } catch (error) {
                  console.log(error);
                  toast({
                    title: "Something went wrong!",
                    description: error.message,
                  });
                } finally {
                  setIsTraining(false);
                }
              }}
              disabled={isTraining}
            >
              {isTraining && <Loader2 className="animate-spin" />}
              Train model
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="95%" height={400}>
            <LineChart className="" data={data}>
              <XAxis
                dataKey="x"
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
              <CartesianGrid
                stroke="hsl(var(--border))"
                strokeDasharray="5 5"
              />
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
        </CardContent>
        <CardDescription className="text-center mb-4 w-full">
          BizGrow can make mistake. Check important info.
        </CardDescription>
      </Card>
    </div>
  );
};

export default Forecast;
