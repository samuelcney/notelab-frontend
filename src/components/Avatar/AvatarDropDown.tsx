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
import Icon from "../Icon";
import { useModal } from "@/main/context/modal";

export const AvatarDropDown = () => {
  const navigation = useRouter();

  const { openModal } = useModal();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AvatarBallComponent abbreviation="SC" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-light-dark animate-fade-in text-white mr-5 mt-2 border">
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Icon name="User" onClick={() => navigation.push("/profile")} />
          Perfil
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigation.push("/configurations")}>
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
