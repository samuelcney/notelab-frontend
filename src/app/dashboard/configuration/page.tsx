"use client";

import { PageRoot } from "@/presentation/layout/PageRoot";
import { ChangePasswordTab } from "@/presentation/pages/configuration/change-password.tab";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/presentation/ui/card";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/presentation/ui/tabs";
import { Lock } from "lucide-react";

export default function ConfigPage() {
  return (
    <PageRoot>
      <div className="flex flex-1 w-full h-full pt-6 px-2 flex-col">
        <div className="sm:ml-24 mt-6 mb-8">
          <h1 className="text-4xl font-semibold tracking-wide max-sm:text-2xl">
            Configurações
          </h1>
          <p className="text-muted-foreground mt-2">
            Gerencie suas preferências e informações da conta
          </p>
        </div>

        <div className="sm:px-24 pb-16">
          <Tabs defaultValue="perfil" className="w-full" value="safety">
            <TabsList className="grid grid-cols-5 w-full max-w-3xl mb-8">
              <TabsTrigger value="safety" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span className="max-sm:hidden">Segurança</span>
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
                    <ChangePasswordTab />
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
