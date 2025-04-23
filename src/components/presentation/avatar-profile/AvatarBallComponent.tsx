"use client";

import Icon from "@/components/Icon";

interface AvatarProps {
  abbreviation: string;
  isBigSize?: boolean;
}

const getAbbreviation = (name: string) => {
  if (!name) {
    return "?";
  }
  const nameParts = name.split(" ");
  if (nameParts.length === 1) {
    return nameParts[0].substring(0, 2).toUpperCase();
  }

  return (
    nameParts[0].charAt(0).toUpperCase() + nameParts[1].charAt(0).toUpperCase()
  );
};

export const AvatarBallComponent = ({
  abbreviation,
  isBigSize,
}: AvatarProps) => {
  const size = isBigSize ? "w-[62px] h-[62px]" : "w-[46px] h-[46px]";
  const fontSize = isBigSize ? "text-2xl" : "text-xl";

  const abbreviatedName = getAbbreviation(abbreviation);

  return (
    <div className="relative">
      <span
        className={`${size} rounded-full bg-greenApp flex items-center justify-center ${
          !isBigSize && "cursor-pointer"
        }`}
      >
        {abbreviatedName ? (
          <h1 className={`${fontSize} text-white font-semibold tracking-wide`}>
            {abbreviatedName}
          </h1>
        ) : (
          <Icon name="User" />
        )}
      </span>
    </div>
  );
};
