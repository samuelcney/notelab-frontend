interface AvatarProps {
  abbreviation: string;
  isBigSize?: boolean;
}

export const Avatar = ({ abbreviation, isBigSize }: AvatarProps) => {
  const size = isBigSize ? "w-[62px] h-[62px]" : "w-[46px] h-[46px]";
  const fontSize = isBigSize ? "text-2xl" : "text-xl";
  return (
    <span
      className={`${size} rounded-full bg-greenApp flex items-center justify-center cursor-pointer`}
    >
      <h1 className={`${fontSize} text-white font-semibold tracking-wide`}>
        {abbreviation}
      </h1>
    </span>
  );
};
