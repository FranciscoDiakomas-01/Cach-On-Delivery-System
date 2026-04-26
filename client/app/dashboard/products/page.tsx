"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Plus, Download } from "lucide-react";

import { useQueryWatch } from "@/hooks/useQueryWatch";
import { productsMock } from "@/mocks/productsMock";
import ProductCard from "@/components/ProductCard";
import { Stat } from "@/types";
import StatsCard from "@/components/StatsCard";

export default function ProductsPage() {
  const { query, setQueryParam } = useQueryWatch("search");
  const search = (query as string) ?? "";

  const [page, setPage] = useState(1);
  const pageSize = 4;

  const filtered = useMemo(() => {
    return productsMock.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);
  const visible = useMemo(() => {
    return filtered.slice(0, page * pageSize);
  }, [filtered, page]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const productStats: Stat[] = [
    {
      value: 5,
      title: "Total produtos",
      description: "Produtos cadastrados",
      isCoin: false,
    },
    {
      value: 4,
      title: "Produtos ativos",
      description: "Disponíveis na loja",
      isCoin: false,
    },
    {
      value: 2,
      title: "Produtos em destaque",
      description: "Featured na homepage",
      isCoin: false,
    },
    {
      value: 750,
      title: "Unidades vendidas",
      description: "Total global",
      isCoin: false,
    },
  ];
  return (
    <article className="w-full flex flex-col gap-4 pt-10 px-3">
      <span className="grid gap-4  lg:grid-cols-4 md:grid-cols-2">
        {Array.isArray(productStats) &&
          productStats.length > 0 &&
          productStats.map((item, index) => (
            <StatsCard
              key={index}
              isCoin={item.isCoin}
              title={item.title}
              value={item.value}
              description={item.description}
            />
          ))}
      </span>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Produtos</h1>
          <p className="text-sm text-muted-foreground">
            Gestão de catálogo, stock e vendas
          </p>
        </div>

        <div className="flex gap-2">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Novo Produto
          </Button>
        </div>
      </div>

      <div className="flex justify-between">
        <Input
          className="max-w-sm"
          placeholder="Pesquisar produto..."
          value={search}
          onChange={(e) => {
            setQueryParam("search", e.target.value);
            setPage(1);
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {visible.map((p) => (
          <ProductCard product={p} key={p.id} />
        ))}
      </div>

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
