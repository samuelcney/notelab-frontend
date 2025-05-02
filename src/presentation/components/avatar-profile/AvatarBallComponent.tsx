"use client";

interface AvatarBallComponentProps {
  abbreviation: string;
  isBigSize?: boolean;
}

export function AvatarBallComponent({
  abbreviation,
  isBigSize,
}: AvatarBallComponentProps) {
  const sizeClass = isBigSize ? "h-16 w-16 text-xl" : "h-8 w-8 text-sm";

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-green-500 text-white font-bold uppercase ${sizeClass}`}
    >
      {abbreviation.slice(0, 2)}
    </div>
  );
}
