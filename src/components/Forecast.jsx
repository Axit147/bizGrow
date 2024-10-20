import React, { useEffect, useState } from "react";
import { get_forecast, predict_sales, train_model } from "../api";
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
// import { get_dashboard } from "../api/apis";
import Lottie from "lottie-react";
import Animation from "../assets/lottie/Animation - 1727850616990.json";
import { Button } from "./ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useToast } from "../hooks/use-toast";

const Forecast = () => {
  const params = useParams();
  const { toast } = useToast();
  const [data, setData] = useState([]);
  const [isTraining, setIsTraining] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);
  const [date, setDate] = useState();
  const [predictedData, setPredicatedData] = useState(null);

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
          <div className="flex items-center gap-5 mb-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Button
              disabled={isPredicting}
              onClick={async () => {
                setIsPredicting(true);
                console.log(format(date, "yyyy-MM-dd"))
                try {
                  const res = await predict_sales(params.id, {
                    date: format(date, "yyyy-MM-dd"),
                  });
                  console.log(res.data);
                  setPredicatedData(res.data.predicted_sales);
                } catch (error) {
                  toast({
                    title: "Something went wrong!",
                    variant: "destructive",
                    description: error.message,
                  });
                } finally {
                  setIsPredicting(false);
                }
              }}
            >
              {isPredicting && <Loader2 className="animate-spin" />}
              Predict
            </Button>
          </div>
          {predictedData && date && (
            <div className="mb-4 text-sm">
              Predicted sales for date {format(date, "PPP")} :{" "}
              <span className="font-semibold text-lg">₹{parseFloat(predictedData).toFixed(2)}</span>
            </div>
          )}
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
