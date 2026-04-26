"use client";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash, Plus, Download } from "lucide-react";
import { useQueryWatch } from "@/hooks/useQueryWatch";
import { categoriesMock } from "@/mocks/categoriesMock";
import { Stat } from "@/types";
import StatsCard from "@/components/StatsCard";
import { FolderTree, Folder, FolderOpen } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { getStatusBadge } from "@/lib/utl";

export default function CategoriesPage() {
  const { query, setQueryParam } = useQueryWatch("search");
  const data = categoriesMock;
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const categoryStats: Stat[] = [
    {
      value: 18,
      title: "Categorias totais",
      description: "Todas as categorias",
      isCoin: false,
    },
    {
      value: 12,
      title: "Categorias ativas",
      description: "Disponíveis no sistema",
      isCoin: false,
    },
    {
      value: 5,
      title: "Categorias em destaque",
      description: "Featured para homepage",
      isCoin: false,
    },
    {
      value: 3,
      title: "Subcategorias",
      description: "Categorias com parentId",
      isCoin: false,
    },
  ];

  const [open, setOpen] = useState(false);
  const search = (query as string) ?? "";

  const filtered = useMemo(() => {
    return data.filter((c) =>
      c.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const totalPages = Math.ceil(filtered.length / pageSize);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <article className="w-full flex flex-col gap-4 pt-10">
      <span className="grid gap-4 px-3 lg:grid-cols-4 md:grid-cols-2">
        {Array.isArray(categoryStats) &&
          categoryStats.length > 0 &&
          categoryStats.map((item, index) => (
            <StatsCard
              key={index}
              isCoin={item.isCoin}
              title={item.title}
              value={item.value}
              description={item.description}
            />
          ))}
      </span>
      <div className="flex items-center justify-between p-3">
        <div>
          <h1 className="text-2xl font-bold">Categorias</h1>
          <p className="text-sm text-muted-foreground">
            Gestão de categorias, subcategorias e organização de produtos
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Exportar dados
          </Button>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Nova Categoria
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Criar categoria</DialogTitle>
                <DialogDescription>
                  Cria uma nova categoria para organizar produtos na plataforma.
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-4 pt-2">
                <div className="grid gap-2">
                  <Label>Título</Label>
                  <Input
                    placeholder="Eletrônicos"
                    onChange={(e) => handleChange("title", e.target.value)}
                  />
                </div>

                {/* SLUG */}
                <div className="grid gap-2">
                  <Label>Slug</Label>
                  <Input
                    placeholder="eletronicos"
                    onChange={(e) => handleChange("slug", e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Descrição</Label>
                  <Input
                    placeholder="Descrição da categoria"
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                  />
                </div>

                {/* IMAGE */}
                <div className="grid gap-2">
                  <Label>Imagem URL</Label>
                  <Input
                    placeholder="https://..."
                    onChange={(e) => handleChange("imageUrl", e.target.value)}
                  />
                </div>

                {/* LEVEL */}
                <div className="grid gap-2">
                  <Label>Nível</Label>
                  <Input type="number" placeholder="0" />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancelar
                  </Button>

                  <Button>Criar categoria</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <span className="px-3 flex flex-col gap-2">
        <Card className="px-2 flex flex-col gap-6 border">
          <div className="flex items-center justify-between">
            <Input
              placeholder="Pesquisar categoria..."
              value={search}
              onChange={(e) => {
                setQueryParam("search", e.target.value);
                setPage(1);
              }}
              className="max-w-sm"
            />
          </div>

          {/* TABLE */}
          <Card className="p-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Pai</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Destaque</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Subcategorias</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginated.map((cat) => (
                  <TableRow key={cat.id}>
                    <TableCell className="font-medium flex gap-2 items-center">
                      <div className="flex h-full items-center gap-2">
                        {cat.imageUrl && (
                          <img
                            src={cat.imageUrl}
                            className="w-8 h-8  object-cover"
                          />
                        )}

                        <span className="text-sm flex flex-col gap-1">
                          <h2>{cat.title}</h2>
                          <p className="opacity-60">{cat.description}</p>
                          <small>#{cat.slug}</small>
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      {cat.parent ? (
                        <div className="flex items-center gap-2">
                          {cat.parent.imageUrl && (
                            <img
                              src={cat.parent.imageUrl}
                              className="w-8 h-8  object-cover"
                            />
                          )}
                          <span className="text-sm flex flex-col gap-1">
                            <h2>{cat.parent.title}</h2>
                            <p className="opacity-60">
                              {cat.parent.description}
                            </p>
                            <small>#{cat.parent.slug}</small>
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          Sem categoria pai
                        </span>
                      )}
                    </TableCell>

                    {/* STATUS */}
                    <TableCell>{getStatusBadge(cat.isActive)}</TableCell>

                    {/* FEATURED */}
                    <TableCell>
                      <Badge variant={cat.isFeatured ? "default" : "outline"}>
                        {cat.isFeatured ? "Destaque" : "Normal"}
                      </Badge>
                    </TableCell>

                    {/* LEVEL */}
                    <TableCell>
                      <Badge variant="outline" className="gap-1">
                        {cat.level === 0 ? (
                          <>
                            <FolderTree className="w-3.5 h-3.5" />
                            Principal
                          </>
                        ) : (
                          <>
                            <Folder className="w-3.5 h-3.5" />
                            Subcategoria
                          </>
                        )}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge variant={ "outline"}>
                        {cat.children.length} subcategorias
                      </Badge>
                    </TableCell>

                    {/* ACTIONS */}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Plus className="w-4 h-4 mr-2" />
                            Sub
                          </DropdownMenuItem>
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* PAGINATION */}
          <div className="flex justify-between items-center">
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
        </Card>
      </span>
    </article>
  );
}
