"use client";

import { PageRoot } from "@/presentation/layout/PageRoot";
import { Button } from "@/presentation/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/presentation/ui/card";
import { Input } from "@/presentation/ui/input";
import { Label } from "@/presentation/ui/label";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/presentation/ui/tabs";
import { Lock, Settings2 } from "lucide-react";
import { useState } from "react";

export default function ConfigPage() {
  const [name, setName] = useState("João Silva");
  const [email, setEmail] = useState("joao.silva@exemplo.com");
  const [language, setLanguage] = useState("pt-BR");

  return (
    <PageRoot>
      <div className="flex flex-1 w-full h-full pt-6 px-1 flex-col">
        <div className="ml-24 mt-6 mb-8">
          <h1 className="text-4xl font-semibold tracking-wide">
            Configurações
          </h1>
          <p className="text-muted-foreground mt-2">
            Gerencie suas preferências e informações da conta
          </p>
        </div>

        <div className="px-24 pb-16">
          <Tabs defaultValue="perfil" className="w-full">
            <TabsList className="grid grid-cols-5 w-full max-w-3xl mb-8">
              <TabsTrigger value="perfil" className="flex items-center gap-2">
                <Settings2 className="h-4 w-4" />
                <span>Geral</span>
              </TabsTrigger>
              <TabsTrigger value="safety" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span>Segurança</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="safety">
              <div className="grid gap-6 max-w-3xl">
                <Card>
                  <CardHeader>
                    <CardTitle>Segurança da Conta</CardTitle>
                    <CardDescription>
                      Gerencie sua senha e configurações de segurança
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-foreground">
                        Alterar senha:
                      </h3>
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Senha atual</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">Nova senha</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">
                            Confirmar nova senha
                          </Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                        <Button className="w-fit bg-foreground text-background">
                          Atualizar senha
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageRoot>
  );
}
