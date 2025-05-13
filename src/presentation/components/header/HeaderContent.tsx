"use client";
import Icon from "../Icon";
import { AvatarDropDown } from "../avatar-profile/AvatarDropDown";
import { SearchInput } from "../search-input/SearchInput";
import ThemeToggle from "../theme/ThemeToggle";

import { useCurrentUser } from "@/main/hooks/auth/use-current-user";
import { pathNameEnum } from "@/utils/Enums";
import { useRouter } from "next/navigation";
import { NotificationDropDown } from "../notifications/NotificationDropdown";
import { HeaderTextItem } from "./HeaderTextItem";

export const HeaderContent = ({
  haveSearchBar,
}: {
  haveSearchBar?: boolean;
}) => {
  const navigation = useRouter();

  const user = useCurrentUser();

  return (
    <div
      className={`flex w-full h-full ${
        haveSearchBar ? "items-center justify-between" : "justify-end"
      } flex-row`}
    >
      {haveSearchBar && <SearchInput />}

      <div className="flex h-full items-center gap-7 pr-2">
        {user?.role !== "INSTRUCTOR" && (
          <HeaderTextItem
            text="Ensine na NoteLab.io"
            onclick={() => navigation.replace(pathNameEnum.SEND_REQUEST)}
          />
        )}

        <HeaderTextItem
          text="Meus cursos"
          onclick={() => navigation.replace(pathNameEnum.MY_COURSES)}
        />

        <ThemeToggle />

        <Icon
          name="ShoppingCart"
          size={28}
          strokeWidth={1}
          className="cursor-pointer"
          color="white"
          onClick={() => navigation.replace(pathNameEnum.CART)}
        />
        <NotificationDropDown />

        <AvatarDropDown />
      </div>
    </div>
  );
};
