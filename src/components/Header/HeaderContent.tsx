import Icon from "../Icons/Icon";
import { SearchInput } from "../SearchInput/SearchInput";
import ThemeToggle from "../Theme/ThemeToggle";
import { HeaderTextItem } from "./HeaderTextItem";

export const HeaderContent = () => {
  return (
    <div className="flex w-full h-full items-center justify-between">
      <SearchInput />

      <div className="flex h-full items-center gap-5 pr-2">
        <HeaderTextItem text="Ensine na IntelliMusic" />

        <HeaderTextItem text="Meus cursos" />

        <ThemeToggle />

        <Icon
          name="ShoppingCart"
          size={24}
          strokeWidth={1}
          className="cursor-pointer"
        />
        <Icon
          name="Bell"
          size={24}
          strokeWidth={1}
          className="cursor-pointer"
        />

        <span className="w-[46px] h-[46px] rounded-full bg-greenApp flex items-center justify-center cursor-pointer">
          <h1 className="text-xl text-white font-semibold tracking-wide">SC</h1>
        </span>
      </div>
    </div>
  );
};
