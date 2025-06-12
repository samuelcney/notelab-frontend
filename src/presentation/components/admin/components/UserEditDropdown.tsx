"use client";
import { useUpdateUserStatus } from "@/main/hooks/users/admin/use-update-user-status";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/presentation/ui/dropdown-menu";
import { UserType } from "@/types/types";
import Icon from "../../Icon";

export const UserEditDropdown = (user: UserType) => {
  const { mutateAsync, isPending: updatingStatus } = useUpdateUserStatus();

  const handleStatusChange = async (userId: string, newStatus: boolean) => {
    if (updatingStatus) return;

    await mutateAsync({
      userId,
      newStatus,
    });
  };

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Icon
          name="Ellipsis"
          size={28}
          strokeWidth={1}
          className="cursor-pointer text-foreground"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-light-dark animate-fade-in text-white mr-5 mt-2 border min-w-[200px]">
        <DropdownMenuLabel>Editar usuário</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => handleStatusChange(user.id, !user.isActive)}
        >
          <Icon name="Settings2" /> {user.isActive ? "Desativar" : "Ativar"}{" "}
          usuário
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
