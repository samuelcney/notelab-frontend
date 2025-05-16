"use client";

import { UserType } from "@/types/types";

interface AvatarBallComponentProps {
  abbreviation: string;
  isBigSize?: boolean;
  className?: string;
  isMyProfile?: boolean;
  user: UserType;
}

export function AvatarBallComponent({
  abbreviation,
  isBigSize,
  className,
  user,
}: AvatarBallComponentProps) {
  const sizeClass = isBigSize ? "h-16 w-16 text-xl" : "h-10 w-10 text-sm";

  return (
    <div
      className={
        `flex items-center justify-center rounded-full bg-green-500 text-white font-bold uppercase ${sizeClass} flex justify-center items-center overflow-hidden shadow-lg border-2 border-white` +
        className
      }
    >
      {user?.userBio?.avatarUrl ? (
        <img
          src={user?.userBio?.avatarUrl}
          alt="Avatar"
          className={`rounded-full ${sizeClass} object-cover`}
          loading="lazy"
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          {abbreviation.slice(0, 2)}
        </div>
      )}
    </div>
  );
}
