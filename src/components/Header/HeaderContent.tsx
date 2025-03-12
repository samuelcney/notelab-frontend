import Icon from "../Icon";
import { AvatarDropDown } from "../Avatar/AvatarDropDown";
import { SearchInput } from "../SearchInput/SearchInput";
import ThemeToggle from "../Theme/ThemeToggle";
import { HeaderTextItem } from "./HeaderTextItem";

export const HeaderContent = ({
  haveSearchBar,
}: {
  haveSearchBar?: boolean;
}) => {
  return (
    <div
      className={`flex w-full h-full ${
        haveSearchBar ? "items-center justify-between" : "justify-end"
      } flex-row`}
    >
      {haveSearchBar && <SearchInput />}

      <div className="flex h-full items-center gap-4 pr-2">
        <HeaderTextItem text="Ensine na NoteLab.io" />

        <HeaderTextItem text="Meus cursos" />

        <ThemeToggle />

        <Icon
          name="ShoppingCart"
          size={24}
          strokeWidth={1}
          className="cursor-pointer"
          color="white"
        />
        <Icon
          name="Bell"
          size={24}
          strokeWidth={1}
          className="cursor-pointer"
          color="white"
        />

        <AvatarDropDown />
      </div>
    </div>
  );
};
