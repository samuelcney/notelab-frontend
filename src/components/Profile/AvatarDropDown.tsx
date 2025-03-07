"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AvatarBallComponent } from "./AvatarBallComponent";
import { useRouter } from "next/navigation";
import ThemeToggle from "../Theme/ThemeToggle";
import Icon from "../Icon";

export const AvatarDropDown = () => {
  const navigation = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AvatarBallComponent abbreviation="SC" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-light-dark animate-fade-in text-white mr-5 mt-2 border">
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Icon name="User" />
          Perfil
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="Settings" /> Configurações
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => navigation.push("/")}>
          <Icon name="LogOut" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
