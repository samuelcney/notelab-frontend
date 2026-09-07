"use client";
import Icon from "../Icon";
import { AvatarDropDown } from "../avatar-profile/AvatarDropDown";
import { SearchInput } from "../search-input/SearchInput";
import ThemeToggle from "../theme/ThemeToggle";

import { useCurrentUser } from "@/main/hooks/auth/use-current-user";
import { useGetCartItemCount } from "@/main/hooks/cart/use-get-item-count";
import { pathNameEnum } from "@/utils/Enums";
import { useRouter } from "next/navigation";
import { HeaderTextItem } from "./HeaderTextItem";

export const HeaderContent = ({
  haveSearchBar,
}: {
  haveSearchBar?: boolean;
}) => {
  const navigation = useRouter();

  const user = useCurrentUser();

  const { data: count } = useGetCartItemCount(user?.id ?? "");

  if (!user) return null;

  return (
    <div
      className={`flex w-full h-full ${
        haveSearchBar ? "items-center justify-between" : "justify-end"
      } flex-row`}
    >
      {haveSearchBar && <SearchInput />}

      <div className="flex h-full items-center gap-7 pr-2">
        <HeaderTextItem
          text="Meus cursos"
          onclick={() => navigation.replace(pathNameEnum.MY_COURSES)}
        />

        <ThemeToggle />

        <div className="relative">
          {count! > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full px-2">
              {count}
            </span>
          )}
          <Icon
            name="ShoppingCart"
            size={28}
            strokeWidth={1}
            className="cursor-pointer"
            color="white"
            onClick={() => navigation.replace(pathNameEnum.CART)}
          />
        </div>

        <AvatarDropDown />
      </div>
    </div>
  );
};
