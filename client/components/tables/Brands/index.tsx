"use client";

import Brand from "@/types/Brand";
import { DataTable } from "./data-table";
import { column } from "./columns";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCcw } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputFile } from "@/components/ui/InputFile";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { SkeletonTable } from "@/components/ui/SkeletonTable";

export default function BrandTables({ data }: { data: Brand[] }) {
  const [file, setFile] = useState<File | null>(null);
  const [useUrl, setUseUrl] = useState(false);
  const [url, setUrl] = useState("");
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 15000);
  }, []);
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
              {isloading ? 0 : data.length}
            </span>
          </button>
        </div>
      </CardHeader>
      <div className="flex  gap-4 justify-end px-2">
        <Button variant={"outline"} className="font-normal">
          <RefreshCcw />
          Refresh
        </Button>
        <Dialog
          onOpenChange={(e) => {
            setFile(null);
          }}
        >
          <form>
            <DialogTrigger asChild>
              <Button>
                <Plus />
                Adicionar
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>Criar marca</DialogTitle>
                <DialogDescription>
                  Adiciona uma nova marca ao sistema. Preenche os dados e guarda
                  para continuar.
                </DialogDescription>
              </DialogHeader>
              <FieldGroup>
                <Field>
                  <Label htmlFor="title">Título</Label>
                  <Input id="title" name="title" placeholder="título ..." />
                </Field>
                <Field>
                  <Label htmlFor="description">Descrição</Label>
                  <Input
                    id="description"
                    name="description"
                    placeholder="descrição ..."
                  />
                </Field>

                {useUrl ? (
                  <Field>
                    <Label htmlFor="image-url">URL da imagem</Label>
                    <Input
                      id="image-url"
                      placeholder="https://exemplo.com/image.png"
                      value={url}
                      type="url"
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </Field>
                ) : (
                  <Field>
                    <Label htmlFor="image">Imagem</Label>
                    <InputFile
                      value={file}
                      onChange={setFile}
                      accept="image/*"
                    />
                  </Field>
                )}
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-sm font-medium">Origem da imagem</p>
                    <p className="text-xs text-muted-foreground">
                      Upload ou link externo
                    </p>
                  </div>
                  <Switch
                    checked={useUrl}
                    onCheckedChange={(checked) => {
                      setUseUrl(checked);

                      // 🔥 limpa o outro estado (essencial)
                      if (checked) setFile(null);
                      else setUrl("");
                    }}
                  />
                </div>
              </FieldGroup>
              <DialogFooter className="w-full grid grid-cols-2 gap-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button type="submit">Criar novo</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>

      {isloading ? (
        <SkeletonTable columns={8} showHeader rows={10} />
      ) : (
        <DataTable
          message="marcas registradas no sistema"
          subtitle="Marcas"
          title="Total marcas"
          columns={column}
          data={data}
        />
      )}
    </Card>
  );
}
