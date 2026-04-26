"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatsCard from "@/components/StatsCard";
import { useQueryWatch } from "@/hooks/useQueryWatch";

import {
  MoreHorizontal,
  Download,
  Eye,
  Truck,
  CheckCircle,
  XCircle,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Card } from "@/components/ui/card";
import { OrderStatus } from "@/types/OrderStatus";
import { ordersMock } from "@/mocks/ordersMock";
import { Stat } from "@/types";
import OrderCard from "@/components/OrderCard";

export default function OrdersPage() {
  const { query, setQueryParam } = useQueryWatch("search");
  const search = (query as string) ?? "";

  const [page, setPage] = useState(1);
  const pageSize = 4;

  const filtered = useMemo(() => {
    return ordersMock.filter(
      (o) =>
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.customer.firstName.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  const visible = useMemo(() => {
    return filtered.slice(0, page * pageSize);
  }, [filtered, page]);

  const stats: Stat[] = [
    {
      value: ordersMock.length,
      title: "Total pedidos",
      description: "Todos os pedidos",
      isCoin: false,
    },
    {
      value: ordersMock.filter((o) => o.status === "DELIVERED").length,
      title: "Entregues",
      description: "Pedidos concluídos",
      isCoin: false,
    },
    {
      value: ordersMock.filter((o) => o.status === "PENDING").length,
      title: "Pendentes",
      description: "Aguardando ação",
      isCoin: false,
    },
    {
      value: ordersMock.reduce((acc, o) => acc + o.total, 0),
      title: "Receita",
      description: "Total gerado",
      isCoin: true,
    },
  ];

  return (
    <article className="w-full flex flex-col gap-4 pt-10 px-3">
      {/* STATS */}
      <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2">
        {stats.map((item, i) => (
          <StatsCard key={i} {...item} />
        ))}
      </div>

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Pedidos</h1>
          <p className="text-sm text-muted-foreground">
            Gestão de pedidos, pagamentos e entregas
          </p>
        </div>

        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Exportar
        </Button>
      </div>

      {/* SEARCH */}
      <Input
        className="max-w-sm"
        placeholder="Pesquisar pedido ou cliente..."
        value={search}
        onChange={(e) => {
          setQueryParam("search", e.target.value);
          setPage(1);
        }}
      />

      {/* FEED */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((order) => (
          <OrderCard order={order} key={order.id} />
        ))}
      </div>

      {/* LOAD MORE */}
      <div className="flex justify-center pt-4">
        {visible.length < filtered.length && (
          <Button variant="outline" onClick={() => setPage((p) => p + 1)}>
            Carregar mais
          </Button>
        )}
      </div>
    </article>
  );
}
