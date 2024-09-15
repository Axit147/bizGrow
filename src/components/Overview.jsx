import React from "react";
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
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

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
  const graphData = generateRandomData(25, 100);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 flex flex-col justify-evenly h-full">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Weekly Bar Chart</CardTitle>
            <CardDescription>Random data visualization</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChartComponent data={graphData} />
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Weekly Line Chart</CardTitle>
            <CardDescription>Random data visualization</CardDescription>
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
