"use client";

import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Paymethod } from "@/types/Paymethod";

export const description = "A radial chart with stacked sections";

const paymentChart = [
  {
    CASH: 10,
    TRANSFER: 20,
    EXPRESS: 30,
    REFERENCE: 40,
  },
];
const chartConfig: Record<Paymethod, any> = {
  CASH: {
    label: "Dinheiro",
    color: "var(--chart-1)",
  },
  EXPRESS: {
    label: "Cartão",
    color: "var(--chart-2)",
  },
  TRANSFER: {
    label: "Tranferência",
    color: "var(--chart-3)",
  },
  REFERENCE: {
    label: "Aplicativo",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;
export function ChartPayemnt() {
  const totalPayments = Object.values(paymentChart[0]).reduce(
    (acc, value) => acc + value,
    0,
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        {" "}
        <CardTitle>Métodos de Pagamento</CardTitle>
        <CardDescription>Distribuição dos pagamentos</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={paymentChart}
            endAngle={180}
            innerRadius={60}
            outerRadius={100}
          >
            <RadialBar
              dataKey="CASH"
              fill={chartConfig.CASH.color}
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />

            <RadialBar
              dataKey="EXPRESS"
              fill={chartConfig.EXPRESS.color}
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />

            <RadialBar
              dataKey="TRANSFER"
              fill={chartConfig.TRANSFER.color}
              stackId="b"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />

            <RadialBar
              dataKey="REFERENCE"
              fill={chartConfig.REFERENCE.color}
              stackId="b"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalPayments}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Pagamentos
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrando pagamentos por método
        </div>
      </CardFooter>
    </Card>
  );
}
