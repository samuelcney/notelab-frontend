"use client";
import Icon from "../../Icon";
import { AvatarDropDown } from "../avatar-profile/AvatarDropDown";
import { SearchInput } from "../search-input/SearchInput";
import ThemeToggle from "../theme/ThemeToggle";

import { useRouter } from "next/navigation";
import { HeaderTextItem } from "../header/HeaderTextItem";
import { pathNameEnum } from "@/utils/enums/Enums";

export const HeaderContent = ({
  haveSearchBar,
}: {
  haveSearchBar?: boolean;
}) => {
  const navigation = useRouter();

  return (
    <div
      className={`flex w-full h-full ${
        haveSearchBar ? "items-center justify-between" : "justify-end"
      } flex-row`}
    >
      {haveSearchBar && <SearchInput />}

      <div className="flex h-full items-center gap-7 pr-2">
        <HeaderTextItem
          text="Ensine na NoteLab.io"
          onclick={() => navigation.push(pathNameEnum.SEND_REQUEST)}
        />

        <HeaderTextItem
          text="Meus cursos"
          onclick={() => navigation.push(pathNameEnum.MY_COURSES)}
        />

        <ThemeToggle />

        <Icon
          name="ShoppingCart"
          size={28}
          strokeWidth={1}
          className="cursor-pointer"
          color="white"
          onClick={() => navigation.push(pathNameEnum.CART)}
        />
        <Icon
          name="Bell"
          size={28}
          strokeWidth={1}
          className="cursor-pointer"
          color="white"
        />

        <AvatarDropDown />
      </div>
    </div>
  );
};
