import Icon from "../Icons/Icon";

export const HeaderContent = () => {
  return (
    <div className="flex w-full h-full items-center justify-between">
      <div className="border border-light-gray w-[45%] h-[70%] rounded-full overflow-hidden px-3 flex items-center gap-3">
        <Icon name="Search" color="gray" size={24} />
        <input
          className="h-full w-full text-sm"
          placeholder="Pesquise aqui o curso que deseja assistir"
        />
      </div>

      <div className="flex h-full items-center gap-6 pr-2">
        <h1 className="text-sm font-light tracking-wide text-light-dark cursor-pointer">
          Meus cursos
        </h1>
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

        <span className="size-[50px] rounded-full bg-green flex items-center justify-center cursor-pointer">
          <h1 className="text-xl text-white font-semibold tracking-wide">SC</h1>
        </span>
      </div>
    </div>
  );
};
