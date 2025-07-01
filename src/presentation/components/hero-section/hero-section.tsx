"use client";

import { useEffect, useState } from "react";

import { useCurrentUser } from "@/main/hooks/auth/use-current-user";
import { Button } from "@/presentation/ui/button";
import { useRouter } from "next/navigation";
import { AvatarBallComponent } from "../avatar-profile/AvatarBallComponent";

export function HeroSection() {
  const [greeting, setGreeting] = useState<string>("");
  const user = useCurrentUser();
  const { push } = useRouter();

  const userName = user?.name;

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("Bom dia");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Boa tarde");
    } else {
      setGreeting("Boa noite");
    }
  }, []);

  return (
    <div className="relative w-full bg-gradient-to-r from-green-950 to-green-900 py-16 px-6 md:px-12">
      <div className="absolute inset-0  bg-cover bg-center opacity-10"></div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
          {user ? (
            <>
              <span className="max-sm:hidden">
                <AvatarBallComponent
                  abbreviation={userName || ""}
                  isBigSize
                  user={user}
                />
              </span>
              <div className="flex flex-col">
                <span className="text-green-400 font-medium">{greeting}</span>
                <h1 className="text-3xl max-md:text-2xl font-bold text-white">
                  {`Bem vindo(a), ${userName || "Músico"}`}
                </h1>
                <p className="text-gray-300 mt-2 max-w-xl">
                  Descubra novos cursos, aperfeiçoe suas habilidades e mergulhe
                  no mundo da música
                </p>
              </div>
            </>
          ) : (
            <div className="text-white">Carregando...</div>
          )}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button
            className="bg-green-500 hover:bg-green-600 h-12 px-6 font-semibold"
            onClick={() => push("/dashboard/catalog")}
            color="white"
          >
            Explorar Cursos
          </Button>
        </div>
      </div>
    </div>
  );
}
