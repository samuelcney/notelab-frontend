import { translateDifficulty } from "@/utils/translateDifficulty";

export const LevelBadge = ({
  level,
  isFromCard = false,
  isLeft,
}: {
  level: string;
  isFromCard?: boolean;
  isLeft?: boolean;
}) => {
  const { name: levelName, color: levelColor } = translateDifficulty(level);

  return (
    <p
      className={`text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md whitespace-nowrap ${
        isFromCard && `absolute top-2 ${isLeft ? "left-2" : "right-2"} z-10`
      }`}
      style={{ backgroundColor: levelColor ? levelColor : "#a8a8a8" }}
    >
      {levelName.toUpperCase()}
    </p>
  );
};
