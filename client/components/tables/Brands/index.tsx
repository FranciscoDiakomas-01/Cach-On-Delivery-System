"use client";

import Brand from "@/types/Brand";
import { DataTable } from "../data-table";
import { column } from "./columns";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCcw } from "lucide-react";

export default function BrandTables({ data }: { data: Brand[] }) {
  return (
    <Card className="w-full p-0">
      <CardHeader className="flex py-0 flex-col items-stretch border-b p-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-0!">
          <CardTitle>Total de Brands </CardTitle>
          <CardDescription>
            Número total de marcas registadas no sistema
          </CardDescription>
        </div>
        <div className="flex">
          <button className="relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">
              Registos atuais
            </span>
            <span className="text-lg leading-none font-bold sm:text-3xl">
              {data.length}
            </span>
          </button>
        </div>
      </CardHeader>
      <div className="flex  gap-4 justify-end px-2">
        <Button variant={"outline"} className="font-normal">
          <RefreshCcw />
          Refresh
        </Button>
        <Button>
          <Plus />
          Adicionar
        </Button>
      </div>
      <DataTable
        message="marcas registradas no sistema"
        subtitle="Marcas"
        title="Total marcas"
        columns={column}
        data={data}
      />
    </Card>
  );
}
