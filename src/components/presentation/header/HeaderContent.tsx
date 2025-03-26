"use client";
import Icon from "../../Icon";
import { AvatarDropDown } from "../avatar-profile/AvatarDropDown";
import { SearchInput } from "../search-input/SearchInput";
import ThemeToggle from "../theme/ThemeToggle";

import { useRouter } from "next/navigation";
import { HeaderTextItem } from "../header/HeaderTextItem";

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

      <div className="flex h-full items-center gap-6 pr-2">
        <HeaderTextItem text="Ensine na NoteLab.io" />

        <HeaderTextItem
          text="Meus cursos"
          onclick={() => navigation.push("/my-courses")}
        />

        <ThemeToggle />

        <Icon
          name="ShoppingCart"
          size={26}
          strokeWidth={1}
          className="cursor-pointer"
          color="white"
          onClick={() => navigation.push("/cart")}
        />
        <Icon
          name="Bell"
          size={26}
          strokeWidth={1}
          className="cursor-pointer"
          color="white"
        />

        <AvatarDropDown />
      </div>
    </div>
  );
};
