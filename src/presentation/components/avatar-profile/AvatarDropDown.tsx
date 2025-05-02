import { useLogout } from "@/main/hooks/auth/use-logout";
import { useCurrentUser } from "@/main/hooks/users/use-current-user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/presentation/ui/dropdown-menu";
import { pathNameEnum } from "@/utils/Enums";
import { useRouter } from "next/navigation";
import Icon from "../Icon";
import { AvatarBallComponent } from "./AvatarBallComponent";

export const AvatarDropDown = () => {
  const navigation = useRouter();
  const user = useCurrentUser();

  const { mutateAsync: logout } = useLogout();

  const userName = user?.user_metadata?.name ?? "Usuário";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AvatarBallComponent abbreviation={userName} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-light-dark animate-fade-in text-white mr-5 mt-2 border">
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => navigation.replace(pathNameEnum.PROFILE)}
        >
          <Icon name="User" />
          Perfil
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => navigation.replace(pathNameEnum.CONFIGURATION)}
        >
          <Icon name="Settings" /> Configurações
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => logout()}>
          <Icon name="LogOut" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
