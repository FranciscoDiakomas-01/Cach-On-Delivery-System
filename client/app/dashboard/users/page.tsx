"use client";
import { usersMock } from "@/mocks/users";
import UsersTable from "@/components/tables/UsersTable";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserRole from "@/types/UserRole";
import { Label } from "@/components/ui/label";
import { Stat } from "@/types";
import StatsCard from "@/components/StatsCard";

export default function UsersPage() {
  const [open, setOpen] = useState(false);
 const userStats: Stat[] = [
   {
     value: 32,
     title: "Total de usuários",
     description: "Registados na plataforma",
     isCoin: false,
   },
   {
     value: 14,
     title: "Clientes",
     description: "Usuários com role CUSTOMER",
     isCoin: false,
   },
   {
     value: 8,
     title: "Entregadores",
     description: "Usuários com role DELIVERY",
     isCoin: false,
   },
   {
     value: 4,
     title: "Usuários inativos",
     description: "Conta desativada ou suspensa",
     isCoin: false,
   },
 ];
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "DELIVERY" as UserRole,
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    console.log("Create user:", form);
    setOpen(false);
  };
  return (
    <div className="w-full flex flex-col gap-4 pt-10">
      <span className="grid gap-4 px-3 lg:grid-cols-4 md:grid-cols-2">
        {Array.isArray(userStats) &&
          userStats.length > 0 &&
          userStats.map((item, index) => (
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
          <h1 className="text-2xl font-bold">Utilizadores</h1>
          <p className="text-sm text-muted-foreground">
            Gestão de admins, clientes e entregadores
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
                Novo Entregador
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Criar utilizador</DialogTitle>
                <DialogDescription>
                  Adiciona um novo utilizador e define o seu tipo de acesso
                  (admin, cliente ou entregador).
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-4">
                  <Label>Nome</Label>
                  <Input
                    placeholder="João"
                    value={form.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <Label>Sobrenome</Label>
                  <Input
                    placeholder="Silva"
                    value={form.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <Label>Email</Label>
                  <Input
                    placeholder="email@exemplo.com"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <Label>Role</Label>
                  <Input value="DELIVERY" disabled />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancelar
                  </Button>

                  <Button onClick={handleSubmit}>Criar</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <span className="px-3">
        <UsersTable data={usersMock} />
      </span>
    </div>
  );
}
