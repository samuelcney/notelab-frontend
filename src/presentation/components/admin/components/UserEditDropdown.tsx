"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/presentation/ui/dropdown-menu";
import Icon from "../../Icon";

export const UserEditDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Icon
          name="Ellipsis"
          size={28}
          strokeWidth={1}
          className="cursor-pointer"
          color="white"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-light-dark animate-fade-in text-white mr-5 mt-2 border min-w-[200px]">
        <DropdownMenuLabel>Editar usuário</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Icon name="Settings2" /> Desativar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
