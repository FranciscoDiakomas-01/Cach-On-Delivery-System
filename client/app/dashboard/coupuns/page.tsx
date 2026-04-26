"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/StatsCard";
import { useQueryWatch } from "@/hooks/useQueryWatch";
import { couponsMock } from "@/mocks/couponsMock";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontal,
  Edit,
  Trash,
  Plus,
  Download,
  Percent,
  Ticket,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { getCouponStatus, formatDiscount } from "@/lib/utl";

export default function CouponsPage() {
  const { query, setQueryParam } = useQueryWatch("search");
  const search = (query as string) ?? "";

  const [page, setPage] = useState(1);
  const pageSize = 4;

  const filtered = useMemo(() => {
    return couponsMock.filter((c) =>
      c.code.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  const visible = useMemo(() => {
    return filtered.slice(0, page * pageSize);
  }, [filtered, page]);

  const stats = [
    {
      value: couponsMock.length,
      title: "Total cupons",
      description: "Todos os cupons",
      isCoin: false,
    },
    {
      value: couponsMock.filter((c) => c.isActive).length,
      title: "Ativos",
      description: "Disponíveis",
      isCoin: false,
    },
    {
      value: couponsMock.filter((c) => c.usedCount >= c.maxUses).length,
      title: "Esgotados",
      description: "Limite atingido",
      isCoin: false,
    },
    {
      value: couponsMock.reduce((acc, c) => acc + c.usedCount, 0),
      title: "Usos totais",
      description: "Aplicações",
      isCoin: false,
    },
  ];

  return (
    <article className="w-full flex flex-col gap-4 pt-10 px-3">
      {/* STATS */}
      <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2">
        {stats.map((s, i) => (
          <StatsCard key={i} {...s} />
        ))}
      </div>

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Cupons</h1>
          <p className="text-sm text-muted-foreground">
            Gestão de descontos e campanhas
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Exportar
          </Button>

          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Novo Cupom
          </Button>
        </div>
      </div>

      {/* SEARCH */}
      <Input
        className="max-w-sm"
        placeholder="Pesquisar cupom..."
        value={search}
        onChange={(e) => {
          setQueryParam("search", e.target.value);
          setPage(1);
        }}
      />

      {/* GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {visible.map((c) => (
          <Card key={c.id} className="p-4 flex flex-col gap-3">
            {/* HEADER */}
            <div className="flex justify-between items-center">
              <span className="font-semibold flex items-center gap-2">
                <Ticket className="w-4 h-4" />
                {c.code}
              </span>
              {getCouponStatus(c)}
            </div>

            {/* DISCOUNT */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">{formatDiscount(c)}</span>
              <Percent className="w-4 h-4 opacity-60" />
            </div>

            {/* META */}
            <div className="text-xs text-muted-foreground flex flex-col gap-1">
              <span>Min: {c.minPurchase} kz</span>
              <span>
                Usos: {c.usedCount}/{c.maxUses}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-between items-center pt-2">
              <Badge variant="outline">{c.type}</Badge>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </DropdownMenuItem>

                  <DropdownMenuItem className="text-red-500">
                    <Trash className="w-4 h-4 mr-2" />
                    Remover
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Card>
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
