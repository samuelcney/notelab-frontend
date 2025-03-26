interface HeaderItemProps {
  text: string;
  onclick?: () => void;
}

export const HeaderTextItem = ({ text, onclick }: HeaderItemProps) => {
  return (
    <div
      className="flex items-center justify-center h-[35px] rounded-xl transition border-transparent border hover:bg-[#21c45d55] px-3 hover:border-green-800"
      onClick={onclick}
    >
      <h1 className="text-sm font-semibold tracking-wide cursor-pointer text-white">
        {text}
      </h1>
    </div>
  );
};
