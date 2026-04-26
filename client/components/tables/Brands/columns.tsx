"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Brand from "@/types/Brand";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { renderCell } from "@/components/tables/renderCell";
import { useState } from "react";

export const column: ColumnDef<Brand>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ getValue }) => renderCell(getValue()),
  },
  {
    accessorKey: "title",
    header: "Nome",
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ getValue }) => {
      const content = getValue() as string;
      if (content.length >= 60) {
        return content.slice(0, 59) + " ...";
      }
      return content;
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ getValue }) => renderCell(getValue()),
  },
  {
    accessorKey: "createdAt",
    header: "Criado aos",
    cell: ({ getValue }) => {
      const date = getValue() as Date;

      return new Date(date).toLocaleDateString("pt-PT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
  },
  {
    id: "actions",
    header: () => {
      return <span className="text-sm font-medium">Ações</span>;
    },
    cell: ({ row }) => {
      const brand = row.original;
      const [open, setOpen] = useState(false);
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acções </DropdownMenuLabel>

            <Dialog open={open} onOpenChange={setOpen}>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  setOpen(true);
                }}
              >
                <Edit /> Editar
              </DropdownMenuItem>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Editar marca</DialogTitle>
                  <DialogDescription>
                    Aqui vais editar os dados da marca.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-500"
              onClick={() => console.log("Delete brand", brand.id)}
            >
              <Trash /> Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  // ...
];
