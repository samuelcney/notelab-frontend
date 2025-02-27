import Icon from "../Icon";

export const SearchInput = () => {
  return (
    <div className="border border-light-gray w-[45%] h-[42px] rounded-full overflow-hidden px-3 flex items-center gap-3 focus-within:border-greenApp">
      <Icon name="Search" color="gray" size={24} />
      <input
        className="h-full w-full text-sm bg-transparent text-white placeholder:text-light-gray"
        placeholder="Pesquise aqui o curso que deseja assistir"
      />
    </div>
  );
};
