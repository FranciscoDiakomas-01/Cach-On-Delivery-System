"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { User, Shield, Bell, Lock, Save } from "lucide-react";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleProfileChange = (key: string, value: string) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const handlePasswordChange = (key: string, value: string) => {
    setPassword((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <article className="w-full pt-10 px-3  flex flex-col gap-4">
      {/* HEADER */}
      <div className="text-center">
        <h1 className="text-2xl font-bold">Configurações</h1>
        <p className="text-sm text-muted-foreground">
          Gerencie sua conta, segurança e preferências
        </p>
      </div>

      <Tabs
        defaultValue="profile"
        className="w-full flex flex-col items-center"
      >
        {/* TABS HEADER CENTRALIZADO */}
        <TabsList className="grid grid-cols-2 w-full lg:max-w-[40%]">
          <TabsTrigger value="profile" className="gap-2">
            <User className="w-4 h-4" />
            Perfil
          </TabsTrigger>

          <TabsTrigger value="credentials" className="gap-2">
            <Lock className="w-4 h-4" />
            Credenciais
          </TabsTrigger>
        </TabsList>

        {/* PROFILE */}
        <TabsContent
          value="profile"
          className="w-full flex justify-center mt-6"
        >
          <Card className="p-4 flex flex-col gap-4 w-full lg:max-w-[40%]">
            <h2 className="font-semibold">Informações pessoais</h2>

            <div className="grid gap-2">
              <Label>Nome</Label>
              <Input
                placeholder="João"
                value={profile.firstName}
                onChange={(e) =>
                  handleProfileChange("firstName", e.target.value)
                }
              />
            </div>

            <div className="grid gap-2">
              <Label>Sobrenome</Label>
              <Input
                placeholder="Silva"
                value={profile.lastName}
                onChange={(e) =>
                  handleProfileChange("lastName", e.target.value)
                }
              />
            </div>

            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                placeholder="email@email.com"
                value={profile.email}
                onChange={(e) => handleProfileChange("email", e.target.value)}
              />
            </div>

            <Button className="gap-2 w-full">
              <Save className="w-4 h-4" />
              Guardar alterações
            </Button>
          </Card>
        </TabsContent>

        {/* CREDENTIALS */}
        <TabsContent
          value="credentials"
          className="w-full flex justify-center mt-6"
        >
          <Card className="p-4 flex flex-col gap-4 w-full lg:max-w-[40%]">
            <h2 className="font-semibold">Alterar senha</h2>

            <div className="grid gap-2">
              <Label>Senha atual</Label>
              <Input
                type="password"
                onChange={(e) =>
                  handlePasswordChange("current", e.target.value)
                }
              />
            </div>

            <div className="grid gap-2">
              <Label>Nova senha</Label>
              <Input
                type="password"
                onChange={(e) => handlePasswordChange("new", e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label>Confirmar nova senha</Label>
              <Input
                type="password"
                onChange={(e) =>
                  handlePasswordChange("confirm", e.target.value)
                }
              />
            </div>

            <Button className="gap-2 w-full">
              <Save className="w-4 h-4" />
              Atualizar senha
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </article>
  );
}
