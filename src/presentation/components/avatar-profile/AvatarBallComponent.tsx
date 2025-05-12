"use client";

import { useCurrentUser } from "@/main/hooks/users/use-current-user";

interface AvatarBallComponentProps {
  abbreviation: string;
  isBigSize?: boolean;
  className?: string;
}

export function AvatarBallComponent({
  abbreviation,
  isBigSize,
  className,
}: AvatarBallComponentProps) {
  const sizeClass = isBigSize ? "h-16 w-16 text-xl" : "h-10 w-10 text-sm";

  const { user } = useCurrentUser();

  return (
    <div
      className={
        `flex items-center justify-center rounded-full bg-green-500 text-white font-bold uppercase ${sizeClass} ` +
        className
      }
    >
      {user?.info.avatarUrl ? (
        <img
          src={user?.info.avatarUrl}
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
