"use client";
import {
  ArrowUpDown,
  Filter,
  LucideExternalLink,
  RefreshCcw,
  ShoppingCart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange";
import StatsCard from "@/components/StatsCard";
import { Stat } from "@/types";
import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "An interactive bar chart";

const chartData = [
  { month: "Jan", sales: 120000 },
  { month: "Fev", sales: 95000 },
  { month: "Mar", sales: 140000 },
  { month: "Abr", sales: 180000 },
  { month: "Mai", sales: 210000 },
  { month: "Jun", sales: 170000 },
  { month: "Jul", sales: 220000 },
  { month: "Ago", sales: 200000 },
  { month: "Set", sales: 240000 },
  { month: "Out", sales: 260000 },
  { month: "Nov", sales: 300000 },
  { month: "Dez", sales: 350000 },
];

const chartConfig = {
  sales: {
    label: "Vendas",
    color: "#22c55e",
  },
} satisfies ChartConfig;

export default function Page() {
  const stats: Stat[] = [
    {
      value: 1520,
      title: "Pedidos Totais",
      description: "Últimos 30 dias",
      isCoin: false,
    },
    {
      value: 1250000,
      title: "Receita",
      description: "Cash recebido",
      isCoin: true,
    },
    {
      value: 68,
      title: "Taxa de Entrega (%)",
      description: "Eficiência logística",
      isCoin: false,
    },
    {
      value: 320,
      title: "Novos Clientes",
      description: "Aquisição recente",
      isCoin: false,
    },
  ];

  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("sales");

  const total = React.useMemo(
    () => ({
      total: chartData.reduce((acc, curr) => acc + curr.sales, 0),
    }),
    [],
  );
  return (
    <article className=" min-h-[300dvh] w-full flex flex-col gap-4">
      <header className="flex justify-between items-center gap-4 bg-white p-3 py-5 sticky top-15 border-b border-dashed z-3">
        <div className="flex  gap-4">
          <DatePickerWithRange onchange={(date) => {}} />
          <Button variant={"outline"} className="font-normal">
            <Filter />
            Filtrar
          </Button>
          <Button variant={"outline"} className="font-normal">
            <ArrowUpDown />
            Ordernar
          </Button>
        </div>
        <div className="flex  gap-4">
          <Button variant={"outline"} className="font-normal">
            <RefreshCcw />
            Refresh
          </Button>
          <Button variant={"outline"} className="font-normal">
            <ShoppingCart />
            Pedidos
          </Button>
          <Button>
            <LucideExternalLink />
            Exportar
          </Button>
        </div>
      </header>
      <span className="mt-3 px-3 lg:grid-cols-3">
        <h1 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight">
          👋 Olá, Admin
        </h1>
        <p className="text-sm text-muted-foreground">
          Acompanhe o desempenho da sua loja e mantenha o controlo dos pedidos e
          entregas.
        </p>
      </span>
      <span className="grid gap-2 px-3 lg:grid-cols-4">
        {Array.isArray(stats) &&
          stats.length > 0 &&
          stats.map((item, index) => (
            <StatsCard
              key={index}
              isCoin={item.isCoin}
              title={item.title}
              value={item.value}
              description={item.description}
            />
          ))}
      </span>
      <span className=" px-3 flex gap-3">
        <Card className="py-0 flex-1">
          <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-0!">
              <CardTitle>Vendas por mês</CardTitle>
              <CardDescription>Total de vendas ao longo do ano</CardDescription>
            </div>
            <div className="flex">
              {["total"].map((key) => {
                const chart = key as keyof typeof chartConfig;
                return (
                  <button
                    key={chart}
                    data-active={activeChart === chart}
                    className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                    onClick={() => setActiveChart(chart)}
                  >
                    <span className="text-xs text-muted-foreground">Total</span>
                    <span className="text-lg leading-none font-bold sm:text-3xl">
                      {total[key as keyof typeof total].toLocaleString()} kz
                    </span>
                  </button>
                );
              })}
            </div>
          </CardHeader>
          <CardContent className="px-2 sm:p-6">
            <ChartContainer config={chartConfig} className="h-60 w-full">
              <BarChart data={chartData}>
                <CartesianGrid vertical={false} />

                <XAxis dataKey="month" tickLine={false} axisLine={false} />

                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) =>
                        `${Number(value).toLocaleString("pt")} kz`
                      }
                    />
                  }
                />
                <Bar dataKey="sales" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </span>
    </article>
  );
}
