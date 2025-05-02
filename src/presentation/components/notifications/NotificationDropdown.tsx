"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/presentation/ui/dropdown-menu";
import Icon from "../Icon";

export const NotificationDropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Icon
          name="Bell"
          size={28}
          strokeWidth={1}
          className="cursor-pointer"
          color="white"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-light-dark animate-fade-in text-white mr-5 mt-2 border min-w-[200px]">
        <DropdownMenuLabel>Notificações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <span className="text-sm px-2">Não há notificações no momento</span>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
