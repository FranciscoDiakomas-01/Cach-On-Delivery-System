"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { reviewsMock } from "@/mocks/reviewsMock";
import { useQueryWatch } from "@/hooks/useQueryWatch";
import StatsCard from "@/components/StatsCard";
import { Stat } from "@/types";

import {
  Star,
  Download,
  Plus,
  User,
  Package,
  MoreHorizontal,
  Trash,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ReviewsPage() {
  const { query, setQueryParam } = useQueryWatch("search");
  const search = (query as string) ?? "";

  const [page, setPage] = useState(1);
  const pageSize = 4;

  const reviewStats: Stat[] = [
    {
      value: reviewsMock.length,
      title: "Total avaliações",
      description: "Todas avaliações feitas",
      isCoin: false,
    },
    {
      value: reviewsMock.filter((r) => r.rating >= 4).length,
      title: "Avaliações positivas",
      description: "Rating >= 4",
      isCoin: false,
    },
    {
      value:
        reviewsMock.reduce((acc, r) => acc + r.rating, 0) /
          reviewsMock.length || 0,
      title: "Rating médio",
      description: "Qualidade geral",
      isCoin: false,
    },
    {
      value: reviewsMock.filter((r) => r.rating <= 2).length,
      title: "Avaliações negativas",
      description: "Problemas detectados",
      isCoin: false,
    },
  ];

  // 🔍 FILTER
  const filtered = useMemo(() => {
    return reviewsMock.filter(
      (r) =>
        r.content.toLowerCase().includes(search.toLowerCase()) ||
        r.user.firstName.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  // 📄 PAGINATION
  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const totalPages = Math.ceil(filtered.length / pageSize);

  return (
    <article className="w-full flex flex-col gap-4 pt-10 px-3">
      {/* STATS */}
      <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2">
        {reviewStats.map((item, index) => (
          <StatsCard key={index} {...item} />
        ))}
      </div>

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Avaliações</h1>
          <p className="text-sm text-muted-foreground">
            Feedback dos clientes sobre pedidos e produtos
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* SEARCH */}
      <Input
        placeholder="Pesquisar avaliação..."
        value={search}
        onChange={(e) => {
          setQueryParam("search", e.target.value);
          setPage(1);
        }}
        className="max-w-sm"
      />

      {/* FEED */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paginated.map((review) => (
          <Card key={review.id} className="p-4 flex flex-col gap-3">
            {/* USER */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {review.user.firstName} {review.user.lastName}
                </span>
              </div>

              {/* ACTIONS */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="text-red-500">
                    <Trash className="w-4 h-4 mr-2" />
                    Remover
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* RATING */}
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.rating
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-muted"
                  }`}
                />
              ))}
            </div>

            {/* CONTENT */}
            <p className="text-sm text-muted-foreground">{review.content}</p>

            {/* META */}
            <div className="flex justify-between items-center text-xs">
              <Badge variant="outline" className="gap-1">
                <Package className="w-3 h-3" />
                Pedido #{review.order.id.slice(0, 6)}
              </Badge>

              <span className="text-muted-foreground">
                {new Date(review.createdAt).toLocaleDateString("pt-PT")}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center pt-4">
        <p className="text-sm text-muted-foreground">
          Página {page} de {totalPages}
        </p>

        <div className="flex gap-2">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Anterior
          </Button>

          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Próximo
          </Button>
        </div>
      </div>
    </article>
  );
}
