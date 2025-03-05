import Icon from "../Icon";
import { Filter } from "./Filter";

export const SearchInput = () => {
  return (
    <div className="w-[40%] h-[42px] flex flex-row items-center gap-5">
      <div className="border border-light-gray w-full h-full rounded-full overflow-hidden px-3 flex items-center gap-3 focus-within:border-greenApp ml-16">
        <Icon name="Search" color="gray" size={24} />
        <input
          className="h-full w-full text-sm bg-transparent text-white placeholder:text-light-gray"
          placeholder="Pesquise aqui"
        />
      </div>
      <Filter />
    </div>
  );
};
