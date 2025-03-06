import Icon from "../Icon";
import { AvatarDropDown } from "../Profile/AvatarDropDown";
import { SearchInput } from "../SearchInput/SearchInput";
import ThemeToggle from "../Theme/ThemeToggle";
import { HeaderTextItem } from "./HeaderTextItem";

export const HeaderContent = () => {
  return (
    <div className="flex w-full h-full items-center justify-between flex-row">
      <SearchInput />

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
