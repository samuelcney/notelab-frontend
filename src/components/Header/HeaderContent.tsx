import Icon from "../Icons/Icon";
import { SearchInput } from "../SearchInput/SearchInput";
import ThemeToggle from "../Theme/ThemeToggle";

export const HeaderContent = () => {
  return (
    <div className="flex w-full h-full items-center justify-between">
      <SearchInput />

      <div className="flex h-full items-center gap-5 pr-2">
        <div className="flex items-center justify-center w-[135px] h-[35px] rounded-xl transition hover:bg-[#21c45d55] hover:text-green-600">
          <h1 className="text-sm font-normal tracking-wide cursor-pointer">
            Meus cursos
          </h1>
        </div>

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

        <span className="w-[50px] h-[50px] rounded-full bg-greenApp flex items-center justify-center cursor-pointer">
          <h1 className="text-xl text-white font-semibold tracking-wide">SC</h1>
        </span>
      </div>
    </div>
  );
};
