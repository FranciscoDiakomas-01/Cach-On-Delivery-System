"use client";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { TrendingUp, Zap } from "lucide-react";

import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid } from "recharts";
import { Stat } from "@/types";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default function StatsCard({ isCoin, title, value, description }: Stat) {
  return (
    <Card className="rounded-sm   p-3 gap-3 ">
      <header className="flex justify-between">
        <CardTitle>{title}</CardTitle>
        <Zap />
      </header>
      <div className="grid grid-cols-2   flex-1 py-3 my-2  rounded-md">
        <div className="flex flex-col">
          <h2 className="scroll-m-20  pb-2 text-2xl font-semibold tracking-tight ">
            {Number(value).toLocaleString("pt")} {isCoin && "kz"}
          </h2>
          <span className="flex gap-1 opacity-50 text-sm">{description}</span>
        </div>

        <ChartContainer className="h-15  w-full" config={chartConfig}>
          <AreaChart
            data={chartData}
            margin={{
              left: 0,
              right: 0,
            }}
          >
            <CartesianGrid vertical={false} />
            <defs>
              <linearGradient id="fillGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="20%" stopColor="#22c55e" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillGreen)"
              stroke="#22c55e"
              strokeWidth={1}
              dot={false}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </Card>
  );
}
