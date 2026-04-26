"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Mail, UserCircle, MoreHorizontal, Edit, Trash } from "lucide-react";

import { IUser } from "@/types/User";
import AuthProvider from "@/types/AuthProvider";
import Image from "next/image";
import { Shield, Truck, User } from "lucide-react";
import { useQueryWatch } from "@/hooks/useQueryWatch";
import { Checkbox } from "../ui/checkbox";
import { getProviderIcon, getRoleBadge, getStatusBadge } from "@/lib/utl";

export default function UsersTable({ data }: { data: IUser[] }) {
  const { query, setQueryParam } = useQueryWatch("search");
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const filtered = useMemo(() => {
    const q = ((query as string) ?? "").toLowerCase();

    return data.filter(
      (u) =>
        u.firstName.toLowerCase().includes(q) ||
        u.lastName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q),
    );
  }, [data, query]);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const totalPages = Math.ceil(filtered.length / pageSize);

  return (
    <Card className="w-full p-3 space-y-4 border">
      {/* HEADER ACTIONS */}
      <div className="flex items-center justify-between">
        <Input
          placeholder="Pesquisar utilizador..."
          value={(query as string) ?? ""}
          onChange={(e) => {
            setQueryParam("search", e.target.value);
            setPage(1);
          }}
          className="max-w-sm"
        />
      </div>

      <Table>
        <TableCaption>Lista de utilizadores da plataforma</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead>Criado aos</TableHead>
            <TableHead className="text-right">Acções</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginated.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium flex gap-3">
                <Checkbox />
                {index}
              </TableCell>
              <TableCell className="font-medium">
                {user.firstName} {user.lastName}
              </TableCell>
              <TableCell className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                {user.email}
              </TableCell>
              <TableCell>{getRoleBadge(user.role)}</TableCell>
              <TableCell>{getStatusBadge(user.isActive)}</TableCell>
              <TableCell className="flex items-center gap-2">
                <Button variant={"outline"} size={"icon"}>
                  {getProviderIcon(user.authProvider)}
                </Button>
              </TableCell>
              <TableCell>
                {new Date(user.createdAt).toLocaleDateString("pt-PT")}
              </TableCell>
              <TableCell className="text-right">
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
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* PAGINATION */}
      <div className="flex items-center justify-between pt-2">
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
  );
}
